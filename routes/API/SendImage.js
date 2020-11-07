const express = require("express");
const Router = express.Router();
const Busboy = require('busboy');
const fs = require("fs");
const {getConnection} = require("../../server/index");

Router.post("/", (req, res, next) => {
    let busboyBody = {
      files: {},
      fields: {}
    };
    let filecheck = [];
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let id = Object.keys(busboyBody.files).length;    
      busboyBody.files["file" + id] = {
        fieldname: fieldname,
        file: file,
        filename: filename,
        encoding: encoding,
        mimetype: mimetype,
        extension: filename.slice(filename.lastIndexOf("."))
      };
      let buffer = [];
      let lock = false;
      let weight = 0;
      file.on('data', function(data) {
        if(!lock){
          buffer.push(data);
          weight += data.length;
        }
        if(weight > 5*1024*1024){
          buffer = undefined;
          weight = undefined;
          lock = true;
        }
      });
      file.on('end', function() {
        if(buffer){
          if(busboyBody.files["file" + id].extension === ".svg" || busboyBody.files["file" + id].extension === ".png" || busboyBody.files["file" + id].extension === ".jpg"){
            busboyBody.files["file" + id].data = buffer;
            busboyBody.files["file" + id].lock = false;
          }
          else{
            busboyBody.files["file" + id].lock = true;
          }
        }
        else{
          busboyBody.files["file" + id].lock = true;
        }
      });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      let id = Object.keys(busboyBody.fields).length;
      busboyBody.fields["field" + id] = {
        fieldname: fieldname,
        val: val,
        fieldnameTruncated: fieldnameTruncated,
        valTruncated: valTruncated,
        encoding: encoding,
        mimetype: mimetype
      };
    });
    busboy.on('finish', function() {
      fileChecker();
      console.log(busboyBody)
      res.end();
    });
    req.pipe(busboy);



    function fileChecker() { //fetches buffer lock info
      let tmp = [];
      for(let i = 0; i < Object.keys(busboyBody.files).length; i++){
          tmp.push(busboyBody.files[`file${i}`].lock);
      }
      filecheck = tmp;
      createFiles();
      console.log(busboyBody);
    };
    async function createFiles() {
      if(!filecheck.includes(true) && filecheck.length >= 1){ //if checker doesn't include locked buffers and is not empty, proceed
        await getConnection(function(err, connection) {
          if (err) throw err; // not connected!
          // Use the connection
          let query = `INSERT INTO kamil_majek_portfolio.images VALUES (?, ?, ?, ?, ?)`;
          let values = [];
          let title = "N/A";
          let description = "";

          for( let i = 0; i < Object.keys(busboyBody.fields).length; i++){
            if(busboyBody.fields["field" + i].fieldname === "title"){ //api gets the field "title" value on its own
              title = busboyBody.fields["field" + i].val;
            }
            if(busboyBody.fields["field" + i].fieldname === "description"){ //api gets the field "title" value on its own
              description = busboyBody.fields["field" + i].val;
            }
          }
          for( let i = 0; i < Object.keys(busboyBody.files).length; i+=2 ){
            let stamp = Date.now().toString();
            let url = `static/images/image-${stamp}${busboyBody.files["file" + i].extension}`;
            let thumbnailurl = `static/images/image-${stamp}-min${busboyBody.files["file" + (i + 1)].extension}`;
            console.log(busboyBody.files["file" + i].extension);
            if(i == 0){
              values.push(stamp, url, thumbnailurl, title, description);
            }
            else{
              query += ", (? ,? ,?, ?, ?)";
              values.push(stamp, url, thumbnailurl, title, description);
            }
          }
          console.log("query: " + query);
          console.log("values: " + values);
          connection.query(query, values, function (error, results, fields) {
            // When done with the connection, release it.
            if (error) {throw error;}
            else {
                let writer = fs.createWriteStream(`public/` + values[1]);

                busboyBody.files["file" + 0].file.pipe(writer);  //pipe connects readable stream to the writeable stream   

                for( let j = 0; j < busboyBody.files["file" + 0].data.length; j++){ //loop handles all the existing parsed buffers
                  writer.write(busboyBody.files["file" + 0].data[j]); //both .write and .end write to the writeable stream. Difference? .end also closes the stream
                }

                writer.end(); //do not try to write to file after end
                let writermin = fs.createWriteStream(`public/` + values[2]);

                busboyBody.files["file" + 1].file.pipe(writermin);  //pipe connects readable stream to the writeable stream   

                for( let j = 0; j < busboyBody.files["file" + 1].data.length; j++){ //loop handles all the existing parsed buffers
                  writermin.write(busboyBody.files["file" + 1].data[j]); //both .write and .end write to the writeable stream. Difference? .end also closes the stream
                }

                writermin.end(); //do not try to write to file after end

              res.status(200);
              if (filecheck.length > 1){ //checks if there's more than one file coming from frontend and responds depending on it
                res.end("files have been uploaded successfully");
              } 
              else {
                res.end("file has been uploaded successfully");
              }
            }
            connection.release();
            console.log("Results of the database query: ");
            console.log(results);
          });
        });
        
      }
      else{
        console.log(filecheck);
        res.status(422).send("only JPG, SVG, PNG up to 5MB are allowed.");
      }
    }
});

module.exports = Router;


const express = require("express");
const Router = express.Router();
const Busboy = require('busboy');
const bcrypt = require("bcrypt");
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
      extension: fieldname.slice(fieldname.lastIndexOf("."))
    };
    let buffer = [];
    let lock = false;
    let weight;
    file.on('data', function(data) {
      if(!lock){
        buffer.push(data);
        weight += data.length;
      }
      if(weight > 2*1024*1024){
        buffer = undefined;
        weight = undefined;
        lock = true;
      }
    });
    file.on('end', function() {
      if(buffer){
        busboyBody.files["file" + id].data = buffer;
        busboyBody.files["file" + id].lock = false
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
    if(Object.keys(busboyBody.fields).length === 2){
      encrypt(busboyBody.fields.field0.val, busboyBody.fields.field1.val);
    }
    else{
      res.status(400).send("What are you trying to do?");
    }
  });
  req.pipe(busboy);
  async function encrypt(username, password) {
    try {
      bcrypt.hash(password, 10).then((hash) => {
        storeUser(username, hash);
      });
    } catch (error) {
      throw error;
    }
  }
  async function storeUser(username, password) {
    try {
      // need a block checking if username exists
      await getConnection(function(err, connection) { //creating new user
        if (err) {res.end("Server maintenance. Try again later."); throw err;} // not connected!
        // Use the connection
        connection.query(`SELECT username FROM kamil_majek_portfolio.users`, function (error, results, fields) {
          // When done with the connection, release it.
          if (error) {connection.release(); res.status(503).end("Service is unavailable"); throw error;}
          else {
            let stringifyQuery = JSON.stringify(results);
            let parsedJSON = JSON.parse(stringifyQuery);
            let match = false;
            for(let i = 0; i < parsedJSON.length; i++){
              if(parsedJSON[i].username === username){
                match = true
              }
            }
            if(match){
              res.end("username already exists, choose another one")
            }
            else{
              connection.query(`INSERT INTO users VALUES (?, ?, ?)`, [username, password, "N"], function (error, results, fields) {
                // When done with the connection, release it.
                if (error) {connection.release(); res.status(503).end("Service is unavailable"); throw error;}
                else {
                  res.end(`Account "${username}" has been created successfully`)
                  connection.release();
                  console.log(`Account ${username} has been created.`);
                  console.log("Results of the database query: ");
                  console.log(results);
                }
              });
            }
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }
});

module.exports = Router;


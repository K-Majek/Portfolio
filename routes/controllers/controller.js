//required modules

const fs = require("fs");
const inspect = require('util').inspect;
const path = require("path");
const bcrypt = require("bcrypt");
const Busboy = require('busboy');
const model = require("../../server/index");
require("dotenv").config({ path: path.join(__dirname, "..", "..", "config", ".env")});


exports.SandboxLab = (req, res) => {

    console.log(test());
}

exports.GetImages = async (req, res) => {
    await model.getConnection((err, connection) => {
        if (err) {res.end("Server maintenance. Try again later."); throw err;}
        connection.query(`SELECT * FROM ${process.env.DB_NAME}.images`, function (error, results, fields) {
          // When done with the connection, release it.
          if (error) {connection.release(); res.status(503).send("Service is unavailable"); throw error;}
          else {
            let parsedResults = JSON.stringify(results);
            res.end(parsedResults);
            // res.status(200).send(results);
            connection.release();
          }
        });
    });
}

exports.GetWebsites = async (req,res) => {
    await model.getConnection((err, connection) => {
        if (err) {res.end("Server maintenance. Try again later."); throw err;}
        connection.query(`SELECT * FROM ${process.env.DB_NAME}.websites`, function (error, results, fields) {
          // When done with the connection, release it.
          if (error) {connection.release(); res.status(503).send("Service is unavailable"); throw error;}
          else {
            let parsedResults = JSON.stringify(results);
            res.end(parsedResults);
            // res.status(200).send(results);
            connection.release();
          }
        });
    });
}

exports.Login = (req, res) => {
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
        check(busboyBody.fields.field0.val, busboyBody.fields.field1.val);
        }
        else{
        res.status(400).send("What are you trying to do?");
        }
    });
    req.pipe(busboy);
    async function check(username, password) {
        try {
            await model.getConnection(function(err, connection) { //creating new user
                if (err) {res.end("Server maintenance. Try again later."); throw err;} // not connected!
                // Use the connection
                connection.query(`SELECT * FROM ${process.env.DB_NAME}.users WHERE username = ?`, [username], function (error, results, fields) {
                    // When done with the connection, release it.
                    if (error) {connection.release(); res.status(503).send("Service is unavailable"); throw error;}
                    else if (results.length === 0) {
                        res.status(401).send("Username does not exist.");
                    }
                    else {
                        let stringifyQuery = JSON.stringify(results);
                        let parsedJSON = JSON.parse(stringifyQuery);
                        let bufferize = Buffer.from(parsedJSON[0].password.data);
                        let parsedBuffer = bufferize.toString('utf8');
                        bcrypt.compare(password, parsedBuffer, function(err, result) {
                        if(err){connection.release(); res.status(503).send("An error has been occurred!"); throw err;}
                        else{
                        console.log(`result of trying to log in for user "${username}" on "${new Date().toString()}": ${result}`);
                        connection.release();
                        login(result);
                            }
                        });
                    }
                });
            });
        } 
        catch (error) {
            throw error;
        }
    }
    function login(data) {
    try {
        if(data){res.status(200).send("Logged in successfully. Redirecting...");}
        else{res.status(401).send("Incorrect password.");}
    } 
    catch (error) {
        throw error;
    }
    }
}

exports.Register = (req, res) => {
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
            await model.getConnection(function(err, connection) { //creating new user
                if (err) {res.end("Server maintenance. Try again later."); throw err;} // not connected!
                // Use the connection
                connection.query(`SELECT username FROM ${process.env.DB_NAME}.users`, function (error, results, fields) {
                // When done with the connection, release it.
                    if (error) {connection.release(); res.status(503).send("Service is unavailable"); throw error;}
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
                                if (error) {connection.release(); res.status(503).send("Service is unavailable"); throw error;}
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
        } 
        catch (error) {
            throw error;
        }
    }
}

exports.SendImage = (req, res) => {
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
    };
    async function createFiles() {
        if(!filecheck.includes(true) && filecheck.length >= 1){ //if checker doesn't include locked buffers and is not empty, proceed
            await model.getConnection(function(err, connection) {
                if (err) throw err; // not connected!
                // Use the connection
                let query = `INSERT INTO ${process.env.DB_NAME}.images VALUES (?, ?, ?, ?, ?)`;
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
                let stamp = Date.now().toString();
                let url = `static/images/image-${stamp}${busboyBody.files["file" + i].extension}`;
                let thumbnailurl = `static/images/image-${stamp}-min${busboyBody.files["file" + (i + 1)].extension}`;
                if(i == 0){
                    values.push(stamp, url, thumbnailurl, title, description);
                }
                else{
                    query += ", (? ,? ,?, ?, ?)";
                    values.push(stamp, url, thumbnailurl, title, description);
                }
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
}

exports.SendWebsite = (req, res) => {
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
    };
    async function createFiles() {
        if(!filecheck.includes(true) && filecheck.length >= 1){ //if checker doesn't include locked buffers and is not empty, proceed
            await model.getConnection(function(err, connection) {
                if (err) throw err; // not connected!
                // Use the connection
                let query = `INSERT INTO ${process.env.DB_NAME}.websites VALUES (?, ?, ?, ?, ?, ?)`;
                let values = [];
                let title = "";
                let description = "";
                let code = "";
                let url = "";
                for( let i = 0; i < Object.keys(busboyBody.fields).length; i++){ //loop gets the required values for variables
                    if(busboyBody.fields["field" + i].fieldname === "title"){
                        title = busboyBody.fields["field" + i].val;
                    }
                    else if(busboyBody.fields["field" + i].fieldname === "description"){
                        description = busboyBody.fields["field" + i].val;
                    }
                    else if(busboyBody.fields["field" + i].fieldname === "code"){
                        code = busboyBody.fields["field" + i].val;
                    }
                    else if(busboyBody.fields["field" + i].fieldname === "outerurl"){
                        url = busboyBody.fields["field" + i].val;
                    }
                }
                for( let i = 0; i < Object.keys(busboyBody.files).length; i++ ){
                    let stamp = Date.now().toString();
                    let thumbnailurl = `static/images/website-${stamp}${busboyBody.files["file" + i].extension}`;
                    if(i == 0){
                        values.push(stamp, title, description, thumbnailurl, url, code);
                    }
                    else{
                        query += ", (? ,? ,?, ?, ?, ?)";
                        values.push(stamp, title, description, thumbnailurl, url, code);
                    }
                }
                console.log("query: " + query);
                console.log("values: " + values);
                connection.query(query, values, function (error, results, fields) {
                    // When done with the connection, release it.
                    if (error) {throw error;}
                    else {
                        let writer = fs.createWriteStream(`public/` + values[3]);

                        busboyBody.files["file" + 0].file.pipe(writer);  //pipe connects readable stream to the writeable stream   

                        for( let j = 0; j < busboyBody.files["file" + 0].data.length; j++){ //loop handles all the existing parsed buffers
                            writer.write(busboyBody.files["file" + 0].data[j]); //both .write and .end write to the writeable stream. Difference? .end also closes the stream
                        }

                        writer.end(); //do not try to write to file after end

                        if (filecheck.length > 1){ //checks if there's more than one file coming from frontend and responds depending on it
                            res.status(200).send("files have been uploaded successfully");
                        } 
                        else {
                            res.status(200).send("file has been uploaded successfully");
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
}


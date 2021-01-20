//required modules

const fs = require("fs");
const inspect = require('util').inspect;
const path = require("path");
const bcrypt = require("bcrypt");
const Busboy = require('busboy');
const model = require("../../server/index");
const sharp = require("sharp");
const stream = require("stream");
require("dotenv").config({ path: path.join(__dirname, "..", "..", "config", ".env")});


exports.SandboxLab = (req, res) => {
    
    console.log(test());
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
                        //incoming query got unexpected content between array indexes, so 4 next lines are for removing this.
                        let stringifyQuery = JSON.stringify(results);
                        let parsedJSON = JSON.parse(stringifyQuery);
                        let bufferize = Buffer.from(parsedJSON[0].password.data);
                        let parsedBuffer = bufferize.toString('utf8');

                        //bcrypt compares the password then returns a boolean
                        bcrypt.compare(password, parsedBuffer, function(err, result) {
                            if(err){connection.release(); res.status(503).send("An error has been occurred!"); throw err;}
                            else{
                                console.log(`result of trying to log in for user "${username}" on "${new Date().toString()}": ${result}`);
                                connection.release();

                                //result of comparing is passed to login function
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

    //if the data is true, server lets view to login the user, otherwise it shows error
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
                            res.status(403).send("username already exists, choose another one");
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

exports.GetContent = async (req,res) => { //R in CRUD
    await model.getConnection((err, connection) => {
        if (err) {res.end("Server maintenance. Try again later."); throw err;}
        connection.query(`SELECT * FROM ${process.env.DB_NAME}.items`, function (error, results, fields) {
          // When done with the connection, release it.
          if (error) {connection.release(); res.status(503).send("Service is unavailable"); throw error;}
          else {
            let parsedResults = JSON.stringify(results);
            res.end(parsedResults);
            connection.release();
          }
        });
    });
}
exports.SendContent = (req, res) => { //C in CRUD
    let busboyBody = {
        files: {},
        fields: {}
    };
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        let id = Object.keys(busboyBody.files).length;    
        busboyBody.files[`file${id}`] = {
            fieldname: fieldname,
            file: file,
            filename: filename,
            filenameTruncated: filename.slice(0, filename.lastIndexOf(".")),
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
                if(busboyBody.files[`file${id}`].extension === ".svg" || busboyBody.files[`file${id}`].extension === ".png" || busboyBody.files[`file${id}`].extension === ".jpg"){
                    busboyBody.files[`file${id}`].data = buffer;
                    busboyBody.files[`file${id}`].lock = false;
                }
                else{
                    busboyBody.files[`file${id}`].lock = true;
                }
            }
            else{
                busboyBody.files[`file${id}`].lock = true;
            }
        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        let id = Object.keys(busboyBody.fields).length;
        busboyBody.fields[fieldname] = {
            fieldname: fieldname,
            val: val,
            fieldnameTruncated: fieldnameTruncated,
            valTruncated: valTruncated,
            encoding: encoding,
            mimetype: mimetype
        };
    });
    busboy.on('finish', function() {
        // console.log(busboyBody);
        send();
    });
    req.pipe(busboy);

    const send = async () => {
        if(!busboyBody.files["file0"].lock){model.getConnection((err, connection) => {
            if(err) console.log(err);
            switch(busboyBody.fields.type.val){
                case "website": {
                    let query = `INSERT INTO ${process.env.DB_NAME}.items VALUES (?, ?, ?, ?, ?, ?, ?)`;
                    let id = Date.now().toString();
                    let title = busboyBody.fields.title.val;
                    let description = busboyBody.fields.description.val;
                    let outerurl = busboyBody.fields.outerurl.val;
                    let code = busboyBody.fields.code.val ? busboyBody.fields.code.val : ""; //code is a must
                    let type = busboyBody.fields.type.val;
                    let file = `website-${id}${busboyBody.files["file0"].extension}`;
                    let file_temp = `website-${id}-temp${busboyBody.files["file0"].extension}`;
                    let server_path = "public/static/images/";
                    let values = [id, title, description, file, outerurl, code, type];
                    connection.query(query, values, async (error, results, fields) => {
                        if(error) { 
                            connection.release(); 
                            console.log(error); 
                        }
                        else {
                            let writer = fs.createWriteStream(server_path+file)
                            busboyBody.files["file0"].file.pipe(writer);  //pipe connects readable stream to the writeable stream   

                            for( let i = 0; i < busboyBody.files["file0"].data.length; i++){ //loop handles all the existing parsed buffers
                                writer.write(busboyBody.files["file0"].data[i]); //both .write and .end write to the writeable stream. Difference? .end also closes the stream
                            }

                            writer.end(); //do not try to write to file after end
                            try { 
                                if(busboyBody.files["file0"].extension.toLowerCase() === ".jpg" || busboyBody.files["file0"].extension.toLowerCase() === ".jpeg"){
                                    await sharp(server_path+file).jpeg({quality: 80})
                                        .resize({width: 1500})
                                        .toFile(server_path+file_temp)
                                        .then(() => {
                                            fs.unlink(server_path+file, (err) => { 
                                                if(err) {console.log(err); res.status(500).send("something went wrong");}
                                                else{
                                                    fs.rename(server_path+file_temp, server_path+file, () => {
                                                        console.log("renamed");
                                                        res.send("image uploaded successfully");
                                                    });
                                                }
                                            });
                                        });
                                }
                                else if(busboyBody.files["file0"].extension.toLowerCase() === ".png"){
                                    await sharp(server_path+file).png({quality: 80})
                                        .resize({width: 1500})
                                        .toFile(server_path+file_temp)
                                        .then(() => {
                                            fs.unlink(server_path+file, (err) => { 
                                                if(err) {console.log(err); res.status(500).send("something went wrong");}
                                                else{
                                                    fs.rename(server_path+file_temp, server_path+file, () => {
                                                        console.log("renamed");
                                                        res.send("image uploaded successfully");
                                                    });
                                                }
                                            });
                                        });
                                }
                                else {
                                    res.status(415).send("Unsupported file extension");
                                }
                            }
                            catch (err) { 
                                console.log(err); 
                            } 
                            finally{
                                connection.release();
                            }
                        }
                    });
                    break;
                }
                case "image": {
                    let query = `INSERT INTO ${process.env.DB_NAME}.items VALUES (?, ?, ?, ?, ?, ?, ?)`;
                    let id = Date.now().toString();
                    let title = busboyBody.fields.title.val;
                    let description = busboyBody.fields.description.val;
                    let file = `image-${id}${busboyBody.files["file0"].extension}`;
                    let file_temp = `image-${id}-tmp${busboyBody.files["file0"].extension}`;
                    let file_minified = `image-${id}-min${busboyBody.files["file0"].extension}`;
                    let serverpath = "public/static/images/";
                    let code = ""; //code is a must
                    let type = busboyBody.fields.type.val;
                    let values = [id, title, description, file_minified, file, code, type];
                    connection.query(query, values, async (error, results, fields) => {
                        if(error) { 
                            connection.release(); 
                            console.log(error); 
                        }
                        else {
                            let writer = fs.createWriteStream(serverpath + file);  

                            for( let i = 0; i < busboyBody.files["file0"].data.length; i++){ //loop handles all the existing parsed buffers
                                writer.write(busboyBody.files["file0"].data[i]); //both .write and .end write to the writeable stream. Difference? .end also closes the stream
                            }

                            writer.end(); //do not try to write to file after end
                            try { 
                                console.log("try block here");
                                if(busboyBody.files["file0"].extension.toLowerCase() === ".jpg" || busboyBody.files["file0"].extension.toLowerCase() === ".jpeg"){
                                    await sharp(serverpath + file)
                                        .resize({width: 1500})
                                        .toFile(serverpath + file_minified)
                                        .then(
                                            async () => {
                                                await sharp(serverpath + file_minified)
                                                    .jpeg({quality: 80});
                                                res.send("image uploaded successfully");
                                            }
                                        )
                                        .catch(e => {
                                            console.log(e);
                                            res.status(500).send("something went wrong");
                                        })
                                }
                                else if(busboyBody.files["file0"].extension.toLowerCase() === ".png"){
                                    await sharp(serverpath + file)
                                        .resize({width: 1500})
                                        .toFile(serverpath + file_minified)
                                        .then(
                                            async () => {
                                                await sharp(serverpath + file_minified)
                                                    .png({quality: 80})
                                                res.send("image uploaded successfully");
                                            }
                                        )
                                        .catch(e => {
                                            console.log(e);
                                            res.status(500).send("something went wrong");
                                        })
                                        
                                }
                                else if(busboyBody.files["file0"].extension.toLowerCase() === ".webp"){
                                    await sharp(serverpath + file)
                                        .resize({width: 1500})
                                        .toFile(serverpath + file_minified)
                                        .then(
                                            async () => {
                                                await sharp(serverpath + file_minified)
                                                    .webp({quality: 80});
                                                res.send("image uploaded successfully");
                                            }
                                        )
                                        .catch(e => {
                                            console.log(e);
                                            res.status(500).send("something went wrong");
                                        })
                                }
                                else {
                                    console.log("file failed to optimise");
                                    res.status(415).send("wrong media type");
                                }
                            } 
                            catch (err) { 
                                console.log(err); 
                            } 
                            finally{
                                connection.release();
                            }
                        }
                    });
                    break;
                }
                default:
                    res.status(422).send("Wrong request");
                    connection.release();
                break;
            }
        });
        
    }
    else{
        res.status(413).send("File is too large to process");
    }

    }
    
}

exports.UpdateContent = (req, res) => {
    let busboyBody = {
        files: {},
        fields: {}
    };
    let filecheck = [];
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        let id = Object.keys(busboyBody.files).length;    
        busboyBody.files[fieldname] = {
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
        busboyBody.fields[fieldname] = {
            fieldname: fieldname,
            val: val,
            fieldnameTruncated: fieldnameTruncated,
            valTruncated: valTruncated,
            encoding: encoding,
            mimetype: mimetype
        };
    });
    busboy.on('finish', function() {
        // console.log(busboyBody);
        send();
    });
    req.pipe(busboy);

    async function send() {
        switch(busboyBody.fields.type.val){
            case "github":
                if(busboyBody.fields.id.val){
                    try{
                        await model.getConnection((err, connection) => {
                            if (err) {res.end("Server maintenance. Try again later."); console.log(err);}
                            connection.query(`UPDATE ${process.env.DB_NAME}.websites SET title = ?, description = ?, innerurl = ?, outerurl = ?, code = ? WHERE id = ?`, [busboyBody.fields.title.val || "", busboyBody.fields.description.val || "", busboyBody.fields.innerurl.val || "", busboyBody.fields.outerurl.val || "", busboyBody.fields.code.val || "", busboyBody.fields.id.val], function (error, results, fields) {
                            // When done with the connection, release it.
                            if (error) {connection.release(); res.status(503).send("Service is unavailable"); console.log("error in controller.js:482", error);}
                            else {
                                res.status(200).send("Website updated successfully");
                            }
                            });
                        });
                    }
                    catch(e) {
                        console.log(e);
                    }  
                } 
                else {
                    res.status(422).send("Item was not selected");
                }
            break;
            case "website":
                if(busboyBody.fields.id.val){
                    try{
                        await model.getConnection((err, connection) => {
                            if (err) {res.end("Server maintenance. Try again later."); console.log(err);}
                            connection.query(`UPDATE ${process.env.DB_NAME}.websites SET title = ?, description = ?, innerurl = ?, outerurl = ?, code = "" WHERE id = ?`, [busboyBody.fields.title.val || "", busboyBody.fields.description.val || "", busboyBody.fields.innerurl.val || "", busboyBody.fields.outerurl.val || "", busboyBody.fields.id.val], function (error, results, fields) {
                            // When done with the connection, release it.
                            if (error) {connection.release(); res.status(503).send("Service is unavailable"); console.log("error in controller.js:504", error)}
                            else {
                                res.status(200).send("Website updated successfully");
                            }
                            });
                        });
                    }
                    catch(e) {
                        console.log(e);
                    }
                } 
                else {
                    res.status(422).send("Item was not selected");
                }
            break;
            case "image":
                if(busboyBody.fields.id.val){
                    try{
                        await model.getConnection((err, connection) => {
                            if (err) {res.end("Server maintenance. Try again later."); console.log(err);}
                            connection.query(`UPDATE ${process.env.DB_NAME}.websites SET URL = ?, thumbnailurl = ?, title = ?, description = ? WHERE id = ?`, [busboyBody.fields.URL.val || "", busboyBody.fields.thumbnail.val || "", busboyBody.fields.title.val || "", busboyBody.fields.description.val || "", busboyBody.fields.id.val], function (error, results, fields) {
                                // When done with the connection, release it.
                                if (error) {connection.release(); res.status(503).send("Service is unavailable"); console.log("error in controller.js:526" ,error);}
                                else {
                                    res.status(200).send("Image updated successfully");
                                }
                            });
                        });
                    }
                    catch(e) {
                        console.log(e);
                    }
                } 
                else {
                    res.status(422).send("Item was not selected");
                }
            break;
            default:
                res.status(400).send("Invalid request. Make sure you filled all the necessary fields and try again.");
            break;
        }
    }
}

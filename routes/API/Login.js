const express = require("express");
const Router = express.Router();
const Busboy = require('busboy');
const inspect = require('util').inspect;
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const {getConnection} = require("../../server/index");
const { use } = require("./SendImage");

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
      check(busboyBody.fields.field0.val, busboyBody.fields.field1.val);
    }
    else{
      res.status(400).send("What are you trying to do?");
    }
  });
  req.pipe(busboy);
  async function check(username, password) {
    try {
      await getConnection(function(err, connection) { //creating new user
        if (err) {res.end("Server maintenance. Try again later."); throw err;} // not connected!
        // Use the connection
        connection.query(`SELECT * FROM kamil_majek_portfolio.users WHERE username = ?`, [username], function (error, results, fields) {
          // When done with the connection, release it.
          if (error) {connection.release(); res.status(503).end("Service is unavailable"); throw error;}
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
    } catch (error) {
      throw error;
    }
  }
  function login(data) {
    try {
      if(data){res.status(200).send("Logged in successfully. Redirecting...");}
      else{res.status(401).send("Incorrect password.");}
    } catch (error) {
      throw error;
    }
  }
});

module.exports = Router;


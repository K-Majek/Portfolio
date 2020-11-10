const express = require('express');
const next = require('next');
const bodyParser = require("body-parser");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const mysql = require("mysql2");
const path = require("path");
const bcrypt = require("bcrypt");

const router = require("../routes/router");

require("dotenv").config({ path: path.join(__dirname, "..", "config", ".env")});
let data = {
  host: 'localhost',
  user: 'root',
  password: process.env.DB_KEY
};
let pool = mysql.createPool(data);
(async function sanityCheck(){ //checks if the modules run properly
  await pool.getConnection((error, connection) => { //database sanity check
    if(error){
      throw error
    }
    else {
      connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, function (error, results, fields) {
        if (error) {connection.release(); console.log("Couldn't process database creation at: index.js:21."); throw error;}
        else {
          console.log(`database "${process.env.DB_NAME}": status 200`);
          connection.release();
        }
      });
    }
  });
  await pool.getConnection((error, connection) => { //"images" table sanity check
    if(error){
      throw error
    }
    else {
      connection.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.images (
        id VARCHAR(14) PRIMARY KEY,
        URL TEXT NOT NULL,
        thumbnailurl TEXT NOT NULL,
        title VARCHAR(20) NOT NULL
      )`, function (error, results, fields) {
        if (error) {connection.release(); console.log("Couldn't process table creation at: index.js:41"); throw error;}
        else {
          console.log(`table images: status 200`);
          connection.release();
        }
      });
    }
  });
  await pool.getConnection((error, connection) => { //"websites" table sanity check
    if(error){
      throw error
    }
    else {
      connection.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.images (
        id VARCHAR(14) PRIMARY KEY,
        title VARCHAR(20) NOT NULL,
        innerurl TEXT NOT NULL,
        outerurl TEXT NOT NULL
      )`, function (error, results, fields) {
        if (error) {connection.release(); console.log("Couldn't process table creation at: index.js:53"); throw error;}
        else {
          console.log(`table websites: status 200`);
          connection.release();
        }
      });
    }
  });
  await pool.getConnection((error, connection) => { //"users" table sanity check
    if(error){
      throw error
    }
    else {
      connection.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.users (
        username VARCHAR(255) PRIMARY KEY,
        password BINARY(60) NOT NULL,
        isadmin VARCHAR(1)
      )`, function (error, results, fields) {
        if (error) {connection.release(); console.log("Couldn't process table creation at: index.js:72"); throw error;}
        else {
          try {
            bcrypt.hash(`${process.env.ROOT_PASSWORD}`, 10).then((hash) => {
              finish(hash);
            });
          } catch (error) {
            connection.release(); console.log("hashing failed at: index.js:70"); throw error;
          }
          function finish(password){
            connection.query(`INSERT IGNORE INTO ${process.env.DB_NAME}.users VALUES (?,?,?)`,["root", password, "Y"], function(err,results,fields){
              if(err){ connection.release(); console.log("root website user creation failed at: index.js:91"); throw err}
              else{
                console.log(`table users: status 200`);
                connection.release();
              }
            })
          }
        }
      });
    }
  });
})();

app.prepare().then(() => {
  const server = express();

  //basic configuration
  server.use(express.static('../public'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  //controller routes
  server.use("/", router);

  //view routes
  server.all('*', (req, res) => {
    return handle(req, res)
  });

  //listener
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

exports.getConnection = async (cb) => { //exportable mysql query module
  await pool.getConnection(function(error, connection){
    if(error){
      return cb(error);
    }
    else {
      cb(null, connection);
    }
  })
}
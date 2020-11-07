const express = require("express");
const Router = express.Router();
const {getConnection} = require("../../server/index");

Router.get("/", async (req,res) => {
    await getConnection((err, connection) => {
        if (err) {res.end("Server maintenance. Try again later."); throw err;}
        connection.query(`SELECT * FROM kamil_majek_portfolio.websites`, function (error, results, fields) {
          // When done with the connection, release it.
          if (error) {connection.release(); res.status(503).end("Service is unavailable"); throw error;}
          else {
            let parsedResults = JSON.stringify(results);
            res.end(parsedResults);
            // res.status(200).end(results);
            connection.release();
          }
        });
    });
});

module.exports = Router;
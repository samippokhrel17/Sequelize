"use strict";
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();
((connection) => {
  let dbClient = null; //varibale to hold db client

  // initialize function to create the database connection pool
  connection.init = async () => {
    try {
      if (!dbClient) {
        //checking db clien is not initilized already
        // mysql connection pool with provided configration
        dbClient = await mysql.createPool({
          host: "localhost",
          user: "root",
          password: "1234",
          database: "employeedb",
        });
        console.log("MySQL connection pool initialized successfully!");
      }
      return dbClient; // return intilialized db client
    } catch (error) {
      console.error("Error at databaseHelper connection.init", error);
      throw error;
    }
  };

  // query functions to execute sql query using the connection pool.
  connection.query = async (query, fields) => {
    try {
      let res = await dbClient.query(query, fields); //query execution using connection poool
      return res;
    } catch (error) {
      console.error("Error at databaseHelper connection.query", error);
      throw error;
    }
  };
})(module.exports);

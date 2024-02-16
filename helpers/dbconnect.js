"use-strict";
const mysql = require("mysql2/promise");

((connection) => {
  let dbClient = null;

  connection.init = async () => {
    try {
      if (!dbClient) {
        dbClient = mysql.createPool({
          host: "localhost",
          user: "root",
          password: "1234",
          database: "employeedb",
        });
        console.log("MySQL connection pool initialized successfully!");
      }
      return dbClient;
    } catch (error) {
      console.error("Error at databaseHelper connection.init", error);
      throw error;
    }
  };

  connection.query = async (query, fields) => {
    try {
      let res = await dbClient.query(query, fields);
      return res;
    } catch (error) {
      console.error("Error at databaseHelper connection.query", error);
      throw error;
    }
  };
})(module.exports);

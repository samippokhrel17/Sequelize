// ((mysqlHelper) => {
//   const mysql = require("mysql2");

const mysql = require("mysql2");

const mysqlHelper = {};

mysqlHelper.connect = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "employeedb",
  });

  // Connecting to database
  connection.connect(function (err) {
    if (err) {
      console.log("Error in the connection");
      console.log(err);
    } else {
      console.log(`Database Connected`);
      connection.query(`SHOW DATABASES`, function (err, result) {
        if (err) console.log(`Error executing the query - ${err}`);
        else console.log("Result: ", result);
      });
    }
  });
};
module.exports = mysqlHelper;

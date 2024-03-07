const { connection } = require("../helpers");

let sqlString = require("sqlstring");

//function to create log entry.

const createLog = async (url, detail) => {
  try {
    if (!url || !detail) return false; //check URL or details
    // return res.status(400).json("All fields are required...");

    let timeStamp = new Date();

    // objs to insert in log table.
    let insertObj = {
      // url: firstName,
      url: url,
      details: detail,
      timeStamp: timeStamp,
    };

    let query = sqlString.format(`INSERT into logTables SET ?`, [insertObj]); //insert querry

    let [result] = await connection.query(query); //execution of query

    if (result.affectedRows > 0) return true; //checkign insert success?

    return false;
  } catch (error) {
    throw error;
  }
};

//function to read log entries.

const readLog = async (req, res) => {
  try {
    let query = sqlString.format(`select * from logTables where true`);

    let [result] = await connection.query(query);

    if (!result) return res.status(400).json("not found...");

    res.status(200).json(result); //sending log entries in response
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createLog, readLog };

const { connection } = require("../helpers");

let sqlString = require("sqlstring");

const createLog = async (url, detail) => {
  try {
    if (!url || !detail) return false;
    // return res.status(400).json("All fields are required...");

    let timeStamp = new Date();

    let insertObj = {
      // url: firstName,
      url: url,
      details: detail,
      timeStamp: timeStamp,
    };

    let query = sqlString.format(`INSERT into logTables SET ?`, [insertObj]);

    let [result] = await connection.query(query);

    if (result.affectedRows > 0) return true;

    return false;
  } catch (error) {
    throw error;
  }
};

const readLog = async (req, res) => {
  try {
    let query = sqlString.format(`select * from logTables where true`);

    let [result] = await connection.query(query);

    if (!result) return res.status(400).json("not found...");

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createLog, readLog };

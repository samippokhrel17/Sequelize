const { connection } = require("../helpers");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
let sqlString = require("sqlstring");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

//user registration function..
const registerUser = async (req, res) => {
  try {
    // Destructure user data from request body
    let { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(400).json("All fields are required...");

    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json(
          "password must be strong password i.e special character, capital,small etc.."
        );

    const salt = await bcrypt.genSalt(1); //salting adds randomness to the hash password

    let hashpassword = await bcrypt.hash(password, salt);
    let createdAt = new Date();
    let updatedAt = new Date();

    // object to insert into database.....
    let insertObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashpassword,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };
    // query to insert
    let query = sqlString.format(`INSERT into employeedb.Student SET ?`, [
      insertObj,
    ]);
    // insert query execution..
    let [result] = await connection.query(query);

    if (result.affectedRows > 0) return res.status(200).send("success");

    //on success of insert
    return res.status(200).send("unsuccess");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

//read user fuction

const readUser = async (req, res) => {
  const { email } = req.body;

  try {
    // query to read user by selecting email provided...

    let query = sqlString.format(`select * from Student where email =?`, [
      email,
    ]);

    let [result] = await connection.query(query);

    if (!result) return res.status(400).json("Invalid email...");

    //send user  data in response if user exist....
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// update user function....

const updateUser = async (req, res) => {
  const email = req.body.email;
  const status = req.body.status ? req.body.status : 2;
  const updatedBy = req.body.updatedByEmail;
  try {
    //query to select user by email....

    let query = sqlString.format(`select * from Student where email =?`, [
      email,
    ]);
    //query execution...
    let [result] = await connection.query(query);

    //if user exist or email update is the same as the users email..
    if (!result || result.email == updatedBy) {
      return res.status(400).send("Not found data");
    }
    // change user status
    let updateQuery = sqlString.format(
      `update Student set status = ? where email = ?`,
      [status, email]
    );

    //update execution

    let [updateResult] = await connection.query(updateQuery);

    // update success checkin
    if (updateResult.affectedRows > 0) {
      return res.status(400).send("updated data");
    }
    return res.status(400).send("Not updated data");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// verify user function

const verifyUser = async (req, res) => {
  try {
    let email = req.body.email; //
    let query = sqlString.format(`select * from Student where email =?`, [
      email,
    ]);

    let [result] = await connection.query(query);

    // usser status update
    if (!result || result[0].status != 2) {
      return res.status(400).send("Not found data");
    }

    let updateQuery = sqlString.format(
      `update Student set status = 1 where email = ?`,
      [email]
    );

    let [updateResult] = await connection.query(updateQuery);
    if (updateResult.affectedRows > 0) {
      return res.status(400).send("verified data");
    }
    res.status(200).send(`Verified user ${email}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { registerUser, readUser, updateUser, verifyUser };

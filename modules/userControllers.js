const { connection } = require("../helpers");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
let sqlString = require("sqlstring");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
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

    // main logic
    let insertObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashpassword,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    let query = sqlString.format(`INSERT into employeedb.Student SET ?`, [
      insertObj,
    ]);

    let [result] = await connection.query(query);

    if (result.affectedRows > 0) return res.status(200).send("success");

    return res.status(200).send("unsuccess");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const readUser = async (req, res) => {
  const { email } = req.body;

  try {
    let query = sqlString.format(`select * from Student where email =?`, [
      email,
    ]);

    let [result] = await connection.query(query);

    if (!result) return res.status(400).json("Invalid email...");

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const email = req.body.email;
  const status = req.body.status ? req.body.status : 2;
  const updatedBy = req.body.updatedByEmail;
  try {
    let query = sqlString.format(`select * from Student where email =?`, [
      email,
    ]);

    let [result] = await connection.query(query);
    if (!result || result.email == updatedBy) {
      return res.status(400).send("Not found data");
    }

    let updateQuery = sqlString.format(
      `update Student set status = ? where email = ?`,
      [status, email]
    );

    let [updateResult] = await connection.query(updateQuery);
    if (updateResult.affectedRows > 0) {
      return res.status(400).send("updated data");
    }
    return res.status(400).send("Not updated data");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const verifyUser = async (req, res) => {
  try {
    let email = req.body.email;
    let query = sqlString.format(`select * from Student where email =?`, [
      email,
    ]);

    let [result] = await connection.query(query);

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

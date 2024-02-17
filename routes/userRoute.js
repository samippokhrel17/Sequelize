const express = require("express");

const {
  registerUser,
  readUser,
  updateUser,
  verifyUser,
} = require("../modules/userControllers");

const { createLog, readLog} = require('../modules/logController')

const router = express.Router();

router.post("/create", createLog('api/v1/user/create','testing user creation'),registerUser);
router.get("/read", createLog('api/v1/user/read','testing user creation'),readUser);
router.put("/update",createLog('api/v1/user/update','testing user creation'), updateUser);
router.put("/verify",createLog('api/v1/user/update','testing user creation'), verifyUser);


router.get('/read-log',readLog)
module.exports = router;

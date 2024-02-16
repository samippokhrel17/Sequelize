const express = require("express");

const {
  registerUser,
  readUser,
  updateUser,
} = require("../modules/userControllers");

const router = express.Router();

router.post("/create", registerUser);
router.get("/read", readUser);
router.put("/update", updateUser);

// router.put("/verify", findUser);

module.exports = router;

const express = require("express");

const {
  registerUser,
  readUser,
  updateUser,
  verifyUser,
} = require("../modules/userControllers");

const { createLog, readLog } = require("../modules/logController");

const router = express.Router();

router.post("/create", async (req, res, next) => {
  try {
    await createLog("api/v1/user/create", "testing user creation");
    await registerUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/read", async (req, res, next) => {
  try {
    await createLog("api/v1/user/read", "testing user read");
    await readUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    await createLog("api/v1/user/update", "testing user update");
    await updateUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/verify", async (req, res, next) => {
  try {
    await createLog("api/v1/user/update", "testing user verify");
    await verifyUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/read-log", readLog);

module.exports = router;

//---------------------------------------------------------------------------------------------------------------------------//
// const express = require("express");

// const {
//   registerUser,
//   readUser,
//   updateUser,
//   verifyUser,
// } = require("../modules/userControllers");

// const { createLog, readLog } = require("../modules/logController");

// const router = express.Router();

// router.post("/create", (req, res, next) => {
//   createLog("api/v1/user/create", "testing user creation")(req, res)
//     .then(() => registerUser(req, res))
//     .catch(next);
// });

// router.get("/read", (req, res, next) => {
//   createLog("api/v1/user/read", "testing user read")(req, res)
//     .then(() => readUser(req, res))
//     .catch(next);
// });

// router.put("/update", (req, res, next) => {
//   createLog("api/v1/user/update", "testing user update")(req, res)
//     .then(() => updateUser(req, res))
//     .catch(next);
// });

// router.put("/verify", (req, res, next) => {
//   createLog("api/v1/user/update", "testing user verify")(req, res)
//     .then(() => verifyUser(req, res))
//     .catch(next);
// });

// router.get("/read-log", readLog);

// module.exports = router;

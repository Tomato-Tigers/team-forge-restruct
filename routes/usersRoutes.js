const express = require("express");
router = express.Router();
usersRoute = require("../controllers/usersControllers");

router.get("/", usersRoute.usersControllers);

module.exports = router;
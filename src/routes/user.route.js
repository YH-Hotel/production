const express = require("express");
const UserData = require("../controllers/User");

const user_router = express.Router();

user_router.get("/api/v1/get-user", UserData);

module.exports = user_router;

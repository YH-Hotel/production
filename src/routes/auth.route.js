const express = require("express");
const Login = require("../controllers/auth/login");
const Register = require("../controllers/auth/register");

const auth_router = express.Router();

auth_router.post("/api/v1/login", Login);
auth_router.post("/api/v1/register", Register);


module.exports = auth_router;

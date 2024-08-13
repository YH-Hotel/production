const express = require("express");
const { AdminLogin, AdminRegister } = require("../controllers/admin");

const admin_auth_router = express.Router();

admin_auth_router.post("/api/v1/admin-login", AdminLogin);
admin_auth_router.post("/api/v1/admin-register", AdminRegister);

module.exports = admin_auth_router;

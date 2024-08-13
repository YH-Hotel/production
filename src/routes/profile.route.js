const express = require("express");
const { UserProfile, ChangePassword } = require("../controllers/profile");
const { SocialAPI, SocialGETAPI } = require("../controllers/social");

const profile_router = express.Router();

profile_router.get("/api/v1/get-profile-details", UserProfile);
profile_router.post("/api/v1/change-password", ChangePassword);
profile_router.post("/api/v1/add-social", SocialAPI);
profile_router.get("/api/v1/get-social", SocialGETAPI);


module.exports = profile_router;
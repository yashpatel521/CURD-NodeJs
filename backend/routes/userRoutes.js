const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
  getUserInfo,
} = require("../controllers/UserControllers");
const { protect } = require("../middleWares/authMiddleWare");

const router = express.Router();

router.route("/").post(registerUser); //api to register a new user
router.route("/login").post(authUser); //api for login
router.route("/profile").post(protect, updateUserProfile); //api for upadte a user , protect is to verify the user JWTtoken
router.route("/userInfo").post(protect, getUserInfo); //api for get user information
module.exports = router;

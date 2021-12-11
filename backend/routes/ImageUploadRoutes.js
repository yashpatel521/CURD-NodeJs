const express = require("express");
const path = require("path");
const multer = require("multer");
const { protect } = require("../middleWares/authMiddleWare");
const User = require("../models/UserModel");
const generateToken = require("../utils/GenerateToken");
const fs = require("fs");

const router = express.Router();

//upload user image in userImage folder
const storage = multer.diskStorage({
  destination: "userImage",
  filename: (req, file, cb) => {
    cb(null, "userImage-" + Date.now() + path.extname(file.originalname));
  },
});
const users = multer({ storage });

router
  .route("/users")
  .post(protect, users.single("image"), async (req, res) => {
    fs.access(req.file.path, fs.F_OK, async (err) => {
      if (err) {
        res.status(404);
        throw new Error("Image Not Found !!!!");
      } else {
        const user = await User.findById(req.user._id);
        fs.unlink("userImage/" + user.pic, async (err) => {
          if (err) {
            res.status(404);
            throw new Error("Image Not Found !!!!");
          }
          if (user) {
            user.pic = req.file.filename;
            const updatedUser = await user.save();
            //   const updatedUser = await User.findById(req.user._id);

            res.json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              pic: updatedUser.pic,
              token: generateToken(user._id),
            });
          } else {
            res.status(404);
            throw new Error("User Not Found !!!!");
          }
        });
      }
    });
  });
module.exports = router;

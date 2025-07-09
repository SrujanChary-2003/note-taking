// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const sendOtp = require("../utils/sendEmail");
// const router = express.Router();

// function generateOtp() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// router.post("/request-otp", async (req, res) => {
//   try {
//     const { name, dob, email } = req.body;
//     if (!name || !dob || !email)
//       return res.status(400).json({ message: "All fields are required" });

//     const otp = generateOtp();
//     let user = await User.findOne({ email });
//     if (!user) user = new User({ name, dob, email, otp });
//     else Object.assign(user, { name, dob, otp });

//     await user.save();
//     await sendOtp(email, otp);
//     res.json({ message: "OTP sent to email" });
//   } catch (err) {
//     console.error("Request OTP Error:", err);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// });
// router.get("/get-user-by-email", async (req, res) => {
//   const { email } = req.query;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found." });
//     res.json({ user });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, dob, email, otp } = req.body;
//     const user = await User.findOne({ email, otp });
//     if (!user) return res.status(400).json({ message: "Invalid OTP or email" });

//     user.verified = true;
//     user.otp = undefined;
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     res.cookie("token", token, { httpOnly: true }).json({
//       message: "Signup successful",
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (err) {
//     console.error("Signup Error:", err);
//     res.status(500).json({ message: "Signup failed" });
//   }
// });

// router.post("/logout", (req, res) => {
//   res.clearCookie("token").json({ message: "Logged out" });
// });

// module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendOtp = require("../utils/sendEmail");
const router = express.Router();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/request-otp", async (req, res) => {
  try {
    const { name, dob, email } = req.body;
    if (!name || !dob || !email)
      return res.status(400).json({ message: "All fields are required" });

    const otp = generateOtp();
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, dob, email, otp });
    } else {
      user.name = name;
      user.dob = dob;
      user.otp = otp;
    }

    await user.save();
    await sendOtp(email, otp);
    res.json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Request OTP Error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

router.get("/get-user-by-email", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, dob, email, otp } = req.body;
    const user = await User.findOne({ email, otp });
    if (!user) return res.status(400).json({ message: "Invalid OTP or email" });

    user.verified = true;
    user.otp = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      })
      .json({
        message: "Signup successful",
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

module.exports = router;

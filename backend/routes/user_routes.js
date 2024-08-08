require("dotenv").config();
const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Token = require("../models/token");

const cookieExpireIn = 1000 * 60 * 60;

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// user register
router.post("/register", async (req, res) => {
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user
      .save()
      .then(() => {
        // Send verification email
        sendVerificationEmail(user.email, user._id);

        res.status(200).json({
          message:
            "User registered successfully. Check your email for verification.",
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// email verify
router.get("/:id/verify/:token", async (req, res) => {
  try {
    // find the user with user id
    const user = await User.findOne({ _id: req.params.id });

    if (user) {
      // update the user to mark as verified
      await User.updateOne({ _id: user._id, verified: true });

      res.json({ success: true, message: "Email Verification Successful." });
    } else {
      res.json({ success: false, message: "User Not Found 404" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    // check if the email is already registered
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Your email is not registered" });
    }

    // check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }

    // resend verification email (if not verified)
    if (!user.verified) {
      sendVerificationEmail(user.email, user._id);
      return res.status(401).json({
        success: false,
        message: "An Email sent to your account please verify",
      });
    }

    //if everything verified
    if (user && validPassword && user.verified) {
      //create token
      const token = createToken(user._id);
      //store token in cookie
      res.cookie("access-token", token, {
        path: "/",
        expires: new Date(Date.now() + cookieExpireIn),
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      return res
        .status(200)
        .json({ success: true, message: "Login successufully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//protected route
router.get("/protected", async (req, res) => {
  const token = req.cookies["access-token"];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        res.status(200).json({
          protected: true,
          user: user,
          message: "User verified and Access Given",
        });
      } else {
        res.status(404).json({ protected: false, message: "User Not Found" });
      }
    } catch (error) {
      res
        .status(403)
        .json({ protected: false, message: "Invalid Token or Expired" });
    }
  } else {
    res.status(404).json({ protected: false, message: "Token Not Found" });
  }
});

//get user by id
router.get("/get_user/:id", async (req, res) => {
  const user_id = req.params.id;

  await User.findById(user_id)
    .then((result) => {
      res.status(200).json({ getUser: true, user: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ getUser: false });
    });
});

//sign out
router.get("/sign_out", async (req, res) => {
  res.clearCookie("access-token");
  res.json({ signout: true, message: "Sign Out successfully" });
});

//-------------------------------------
// Email sending function (nodemailer)
//-------------------------------------
function sendVerificationEmail(email, user_id) {
  // Generate a verification token
  const token = jwt.sign({ userId: user_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Send a verification email
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const verificationLink = `${process.env.FRONT_END_URL}/${user_id}/verify/${token}`;

  transporter
    .sendMail({
      from: process.env.USER,
      to: email,
      subject: "Email Verification",
      html: `Click <a href="${verificationLink}">here</a> to verify your email.`,
    })
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch(() => {
      console.error("Email sent fail");
    });
}

module.exports = router;

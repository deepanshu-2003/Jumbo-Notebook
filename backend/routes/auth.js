const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require('../middleware/fetch_user');
const { query, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "securedWith$AnjaliKaushik$"; //JWT token secret to sign the token and for validation of signature..

// ------------------- User creation-----------------------
// Creating a new user using POST on /auth/create-user
router.post(
  "/create-user",
  [
    body(
      "username",
      "Username is too short minimum length must be of 3 characters"
    ).isLength({ min: 3 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be minimum 8 chars long.").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with same username exists already
    try {
      let user = await User.findOne({ username: req.body.username });
      if (user) {
        return res
          .status(404)
          .json({ error: "Sorry the user with this username already exists." });
      }
      const salt = await bcrypt.genSalt(10);
      const secured_passwd = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: secured_passwd,
      });

      // res.json(user); // we will not send user else , we will send a JWT(Json Web Token) like below
      res.send({ auth_token: jwt.sign(user.id, JWT_SECRET) });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal server error occured");
    }
    // .then(user=>res.json(user));
  }
);

// --------------- User login ----------------------
// authenticating user by user login...
router.post(
  "/login",
  [
    body(
      "username",
      "Username is too short minimum length must be of 3 character"
    ).isLength({ min: 3 }),
    body("password", "Password must be minimum 8 chars long.").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { username, password } = req.body;
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ username: username });
      if (!user) {
        return res
          .status(404)
          .json({ error: "You have entered invalid credentials." });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return res
          .status(404)
          .json({ error: "You have entered invalid credentials." });
      }
      // res.send(user);
      // sending a JWT Token cause user is now authenticated
      res.send({ auth_token: jwt.sign(user.id, JWT_SECRET) });
    } catch (error) {
      return res.status(500).send("Internal server error occured");
    }
    // console.log("Hi "+username);
    // res.send("Hi "+username);
  }
);

// --------------- Fetch User ----------------------
// fetchhing  user details of a specific user by authentication token provided to user using middleware...

router.post("/get-user",fetchUser, async (req, res) => {
  const user_id = req.user;
  try {
    const user = await User.findById(user_id).select("-password");
    res.send(user);
  } catch (error) {
    return res.status(500).send("Internal server error occured");
  }
});

module.exports = router;

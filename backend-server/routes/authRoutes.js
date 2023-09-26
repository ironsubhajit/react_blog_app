const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
// const verify = require("../routes/verifyLoginToken");
const { registerValidation, loginValidation } = require("../validation");

// REGISTER INTO DB
router.post("/signup", async (req, res) => {
  // validate data

  console.log(req.body);
  const { error } = registerValidation(req?.body);
  if (error) {
    return res.status(400).send(JSON.stringify(error));
  }

  // checking email existence
  const emailExist = await User?.findOne({ email: req?.body?.email });
  if (emailExist) {
    return res
      .status(401)
      .send(
        JSON.stringify([
          { property: "email", message: "Email already exists !" },
        ])
      );
  }

  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req?.body?.password, salt);

  console.log("Password hasing done...");

  const user = new User({
    name: req?.body?.name,
    email: req?.body?.email,
    password: hashpassword,
    about: req?.body?.about ? req?.body?.about : "",
    role: req?.body?.role,
  });

  console.log("user instantiated...");

  // save user into db
  try {
    const savedUser = await user.save();
    console.log(`User: ${savedUser}`);
    console.log("User saved.");
    return res.status(200).send(savedUser);
  } catch (err) {
    return res
      .status(400)
      .send(JSON.stringify({ property: "errors", message: err }));
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  // VALIDATE REQUEST DATA
  const { error } = loginValidation(req?.body);

  if (error) return res.status(403).send(JSON.stringify(error));

  // checking email existence
  const user = await User.findOne({ email: req?.body?.email });
  if (!user) {
    return res
      .status(403)
      .send(
        JSON.stringify([
          { property: "email", message: "Email Id not exists !" },
        ])
      );
  }

  // CHECK VALID PASSWORD
  const validPassword = await bcrypt.compare(
    req?.body?.password,
    user?.password
  );
  if (!validPassword)
    return res
      .status(403)
      .send(
        JSON.stringify([
          { property: "password", message: "Invalid password !" },
        ])
      );

  // CREATING A TOKEN FOR THE LOGIN USER
  const token = JWT.sign({ _id: user?._id }, process?.env?.SECRET_KEY);
  const { password, __v, ...filteredUser } = user._doc;
  return res.status(200).send(JSON.stringify({ token, user: filteredUser }));
});


// Function to filter and destructure a user object
const destructureUser = (user) => {
  // Define properties to exclude from the filtered object
  const excludedProperties = ['password', '__v'];

  // Use destructuring to filter and create a new object
  const { password, __v, ...filteredUser } = user?._doc;
  return filteredUser;
};


// fetch user
router.get("/all", async (req, res) => {
  // fetch user by id
  const users = await User?.find();
  if (users) {
    const filteredUsers = users.map(destructureUser);
    return res?.status(200)?.send({ users: filteredUsers });
  } else {
    return res
      ?.status(404)
      ?.send(
        JSON.stringify([{ property: "user", message: "No users found !" }])
      );
  }
});

router.post("/fetch", async (req, res) => {
  // fetch user by id
  try {
    const user = await User?.findOne({ _id: req?.body?._id });
    if (user) {
      const { password, __v, ...filteredUser } = user?._doc;
      return res?.status(200)?.send({ user: filteredUser });
    } else {
      return res?.status(400)?.send({ user: "Anonymous" });
    }
  } catch (error) {
    return res?.status(400)?.send({ user: "Anonymous" });
  }
  
});

module.exports = router;

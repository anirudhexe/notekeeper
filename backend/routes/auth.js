const User = require("../models/user");
const express = require("express");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const jwt_secret = "archithecoder";

//ROUTE 1: create a user using: POST "http://localhost:3000/api/auth/createuser"
router.post(
  "/createuser",
  [
    //validate fields using express validator
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    //check if there are errors with the fields
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      //password hashing using bcrypt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, jwt_secret);
      success=true;
      res.json({success, authtoken });
    } catch (e) {
      //check whether email already exists or not
      if (e.code === 11000) {
        // Duplicate key error
        return res.status(400).json({success, error: "Email already exists" });
      }
      console.error(e);
      res.status(500).send("Server error");
    }
  }
);

//ROUTE 2: authenticate a user using: POST "http://localhost:3000/api/auth/login"
router.post(
  "/login",
  [
    //validate user using express validator
    body("email", "Enter valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success=false;
    //check if there are errors with the fields
    if (!errors.isEmpty()){
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body; //destructuring the body and extracting the email and password
    try {
      let user = await User.findOne({ email });
      if (!user){
        //if user doesn't exist
        return res
          .status(400)
          .json({success, error: "user doesn't exist" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password); //returns true if password matches else returns false
      if (!passwordCompare){
        return res
          .status(400)
          .json({success, error: "please enter correct credentials" });
        }
      else {
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, jwt_secret);
        success=true;
        res.json({success, authtoken});  
      }
    } catch (e) {
        console.error(e);
        res.status(500).send("Server error");
    }
  }
);

//ROUTE 3: get logged in user details using: POST 'http://localhost:3000/api/auth/getuser'
router.post(
  '/getuser',
  fetchuser,
  async(req,res)=>{
    try {
      //middleware is the function that gets called whenever we need to authenticate the user
      let userId=req.user.id;
      const user=await User.findById(userId).select('-password');
      res.send(user);
    } catch (e) {
        console.error(e);
        res.status(500).send("Server error");
    }
  }
)

module.exports = router;

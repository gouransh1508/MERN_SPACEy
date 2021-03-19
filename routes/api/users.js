const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateEventInput = require("../../validation/eventValidation")

// Load User model
const User = require("../../models/User");
// Load event model
const Event = require("../../models/Event")

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          events: user.event_info,
          email: user.email
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});


// @route POST api/users/dashboard
// @desc Register event
// @access private
router.post("/dashboard", (req, res) => {
  // Form validation

  const { errors, isValid } = validateEventInput(req.body);

  // Check validation
   if (!isValid) {
    return res.status(400).json(errors);
  }
  

  User.findOne({ email: req.body.EMail }).then(user => {
    if (user) {
      
      const newEvent ={
        EventName: req.body.EventName,
        EventType: req.body.EventType,
        EventStart: req.body.EventStart,
        EventEnd: req.body.EventEnd,
        NoPeople: req.body.NoPeople,
        EventPlace: req.body.EventPlace,
      }
      
      user.event_info.push(newEvent)

      User.findOneAndUpdate({email: req.body.EMail},user,(result)=>{
        console.log(result)
        return res.status(400).json(user);
      })
    

      // user.collection.update(
      //   user.findOne({ email: req.body.EMail }),
      //   user.insert(newEvent),
      //   {
      //     upsert: true
      //   }
      //   )
        
     

      

    } else {
      return res.status(400).json({ email: "Email does not exists" });
    }
  });
});

module.exports = router;

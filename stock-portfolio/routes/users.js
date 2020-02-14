const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/User');

// @route POST api/users
// @info Registering a user
router.post(
  '/',
  [
    check('name', 'Please add a name')
      .not()
      .isEmpty(),
    check('email', 'Please add valid email').isEmail(),
    check('password', 'Please add a password').exists()
  ],
  async (req, res) => {
    // Returns a result object
    const errors = validationResult(req);
    // If it is not empty, one of the fields hasnt been filled in
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // Allows you to find a user by a specific argument
      let user = await User.findOne({ email });

      // Then check if the user already exists in the database
      // If they do, return an error else add the new user with the given fields
      if (user) {
        return res.status(400).json({ msg: 'A user with that email already exists' });
      }

      // New instance of a user created
      user = new User({
        name,
        email,
        password
      });

      // Encrypt the password
      const salted = await bcrypt.genSalt(8);
      user.password = await bcrypt.hash(password, salted);
      await user.save();

      // Object sent with token
      const payload = {
        user: {
          id: user.id
        }
      };

      // Signing the token and passing in how long the token will be good for
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });

      //
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

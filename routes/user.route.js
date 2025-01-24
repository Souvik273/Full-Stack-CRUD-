const express = require('express');
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.middleware.js');

const Router = express.Router();

// Register a new user
Router.post('/', async (req, res) => {
  const { username, email, pass } = req.body;
  try {
    // Validate input
    if (!(username || email || pass)) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash password
    const saltRounds = Number(process.env.SALT_ROUND) || 10;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    // Save user to the database
    const newUser = new User({ username, email, pass: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: `Error adding a user: ${error.message}` });
  }
});

// User login
Router.post('/login', async (req, res) => {
  const { email, pass } = req.body;
  try {
    // Validate input
    if (!email || !pass) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const matchedUser = await User.findOne({ email });
    if (!matchedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatchingPassword = await bcrypt.compare(pass, matchedUser.pass);
    if (!isMatchingPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: matchedUser._id, username: matchedUser.username },
      process.env.SECRET_KEY,
      { expiresIn: '1h' } // Set token expiry to 1 hour
    );

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(500).json({ message: `Error logging in: ${error.message}` });
  }
});

// Get all users with their notes
Router.get('/user-details', async (req, res) => {
  try {
    const users = await User.find()
      .select('-pass') // Exclude the `pass` field from the User schema
      .populate({
        path: 'notes', // Populate the virtual field `notes`
        select: ' -_id -__v', // Exclude `_id` and `__v` from `notes`
      }); // Populate the notes virtual field excluding id and pass 
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: `Error retrieving users: ${error.message}` });
  }
});

// Get single user all details, including notes
Router.get('/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body; 

  if (!username || !email) {
    return res.status(400).json({ message: 'Invalid fields!' });
  }

  try {
    const user= await User.findOne({userId})
      .select('-pass') // Exclude the `pass` field from the User schema
      .populate({
        path: 'notes', // Populate the virtual field `notes`
        select: ' -_id -__v', // Exclude `_id` and `__v` from `notes`
      }); // Populate the notes virtual field excluding id and pass 

      if(!user){
        return res.status(409).json({message:`user not found`})
      }
    return res.status(200).json(user);
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: `Error retrieving user: ${error.message}` });
  }
});


module.exports = Router;

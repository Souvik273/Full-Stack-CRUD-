const express = require('express');
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Router = express.Router();

Router.post('/', async (req, res) => {
  const { username, email, pass } = req.body;
  try {
    bcrypt.hash(pass, Number(process.env.SALT_ROUND), async (err, hash) => {
      if (err) {
        res.json({
          message: `Error while hashing the password ${err.message}`,
        });
      } else {
        const newUser = new User({ username, email, pass: hash });
        await newUser.save();
        res.status(201).json({ message: `new user added : ${newUser}` });
      }
    });
  } catch (error) {
    res.status(401).json({ message: `Error adding a user : ${error.message}` });
  }
});

Router.post('/login', async(req, res) => {
    const {email,pass} = req.body
    try{
        const matchedUser =await User.findOne({email})
        if(matchedUser){
            const isMathcingPassword = await bcrypt.compare(pass,matchedUser.pass)
            if(isMathcingPassword){
            const token = jwt.sign({userId:matchedUser._id,user:matchedUser.user},process,env.SECRET_KEY)
                res.status(200).json({message:`logging successful!!!`,token})
            }else{
                res.json(`Invalid Password`)
            }
        }else{
            res.status(404).json(`user not found`)
        }
    }catch (error) {
    res.status(401).json({ message: `Error logging a user : ${error.message}` });
  }
});

Router.get('/',async(req,res)=>{
  const user = await User.find().populate("notes")
  res.json(user)
})

module.exports = Router;

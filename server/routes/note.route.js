const express = require('express');
const Note = require('../models/note.model.js');

const Router = express.Router();
const auth = require('../middleware/auth.middleware.js');

// create new note 
Router.post('/', auth, async (req, res) => {
  const { title, desc,userId , username } = req.body;

  if (!title || !desc || !username || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(200).json(`Note Created successfully ${newNote}`);
  } catch (error) {
    res.status(500).json(`Internal Server Error : ${error.message}`);
  }
});

Router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.body.userId });
    res.status(200).json(notes);
  } catch (err) {}
});

Router.patch('/:noteId', auth, async(req, res) => {
  const {noteId} = req.params
  const note = await Note.findOne({_id:noteId})
  if(!note){
    return res.status(404).json({msg:`note with id :${noteId} not present!!!`})
  }
  try {
    if(note.userId.toString() === req.body.userId){
      await Note.findByIdAndUpdate({_id:noteId},req.body)
      return res.status(200).json({msg:`Note Updated`})
    }else{
      return res.status(400).json({msg:`You are not authorized to perform this task`})
    }
  } catch (error) {
    console.log(error)
  }
});

Router.delete('/:noteId', auth, async(req, res) => {
  const {noteId} = req.params
  const note = await Note.findOne({_id:noteId})
  if(!note){
    return res.status(404).json({msg:`note with id :${noteId} not present!!!`})
  }
  try {
    if(note.userId.toString() === req.body.userId){
      await Note.findByIdAndDelete({_id:noteId})
      return res.status(200).json({msg:`Note Deleted`})
    }else{
      return res.status(400).json({msg:`You are not authorized to perform this task`})
    }
  } catch (error) {
    console.log(error)
  }
});

module.exports = Router;

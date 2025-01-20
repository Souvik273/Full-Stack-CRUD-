const express = require('express')
const Note = require('../models/note.model.js')

const Router = express.Router()
const auth = require('../middleware/auth.middleware.js')

Router.post('/',auth,async(req,res)=>{
    const {title,desc,userId,user} = req.body
    try {
        const newNote = new Note(req.body)
        await newNote.save()
        res.status(200).json(`Note Created successfully ${newNote}`)
    } catch (error) {
        res.status(500).json(`Internal Server Error : ${error.message}`)
    }
})

Router.get('/',auth,async(req,res)=>{
    try{
        const notes = await Note.find({userId:req.body.userId})
        res.status(200).json(notes)
    }catch(err){
        
    }
})

Router.patch('/:noteId',auth,(req,res)=>{

})

Router.delete('/:noteId',auth,(req,res)=>{
    
})

module.exports = Router
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    user:{type:String,required:true}
},{versionKey:false,timestamps:true})

const Note = mongoose.model('Note',noteSchema)
module.exports=Note
const express = require('express')
const UserRouter = require('./routes/user.route.js')
const NoteRouter = require('./routes/note.route.js')

const app = express()

app.use(express.json({limit:'16kb'}))

app.use('/users',UserRouter)
app.use('/notes',NoteRouter)

module.exports=app
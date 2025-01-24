const express = require('express')
const UserRouter = require('./routes/user.route.js')
const NoteRouter = require('./routes/note.route.js')
const cors = require("cors")

const app = express()

app.use(express.json({limit:'16kb'}))
app.use(cors({
    origin:"http://localhost:5173",
    optionsSuccessStatus:200
}))

app.use('/users',UserRouter)
app.use('/notes',NoteRouter)

module.exports=app
require('dotenv').config()

const connectDB = require('./config/db.js')
const app = require('./app.js')

connectDB()
.then(()=>{
    console.log(`DB Connected...`)
    app.listen(process.env.PORT || 3000 , ()=>{
        console.log(`server is running on : http://localhost:${process.env.PORT}`)
    })
})
.catch(err=>console.log(`error in db call : ${err.message}`))
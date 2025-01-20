const mongoose = require('mongoose')

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        console.log(`server is running : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(` Error while connecting wuth DB :  ${error.message}`)
    }
}

module.exports = connectDB
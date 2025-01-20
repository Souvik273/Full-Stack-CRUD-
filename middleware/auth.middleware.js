const jwt = require('jsonwebtoken')

const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorizarion?.split("")[1]
        if(!token){
            res.status(400).json({message:`please login first`})
        }
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.body.userId = decoded.userId
        req.body.user = decoded.user
        next()
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports= auth
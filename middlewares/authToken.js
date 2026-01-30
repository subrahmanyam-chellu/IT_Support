const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function(req, res, next){
    try{
        const token = req.header('x-token');
        if(!token){
            console.log("token not found")
            return res.status(400).send("token not found");
        }
        let decoded = jwt.verify(token, process.env.JWT_PASSWORD );
         req.user = decoded;
        //console.log(decoded);
        next();

    }catch(err){
        return res.status(403).send("invalid token");
    }
    
}
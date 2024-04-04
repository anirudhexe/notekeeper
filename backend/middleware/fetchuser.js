const jwt = require('jsonwebtoken');
const jwt_secret = "archithecoder";

const fetchuser=(req,res,next)=>{
    //get the user from the jwt token and add id to the req object
    const token=req.header('auth-token');
    if(!token)
        res.status(401).send({error: "Please authenticate using valid token"});
    try {
        const data=jwt.verify(token, jwt_secret);
        req.user=data.user;
        next();
    } catch (e) {
        res.status(401).send({error: "Please authenticate using valid token"});
    }
}

module.exports=fetchuser;
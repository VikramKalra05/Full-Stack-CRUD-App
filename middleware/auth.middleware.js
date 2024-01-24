const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const token = req.headers.authorization;

    try {
        if(token){
            jwt.verify(token, "apple", (err, decoded) => {
                if(decoded){
                    req.body.userID = decoded.userID;
                    req.body.user = decoded.user; 
                    next();
                }else{
                    res.status(400).send({"msg":"Token is wrong or expired", "error": err})
                }
            })
        }else{
            res.status(400).send({"msg":"Please provide a token"})
        }
    } catch (error) {
        res.status(400).send({"msg":"Something went wrong while authenticating", "error": error})
    }
    
}

module.exports = {
    auth
}
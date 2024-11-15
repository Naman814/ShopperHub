const jwt = require("jsonwebtoken")

const verifyToken = async (req,res,next) =>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1]; // Bearer_ second element is token (postman)
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("Token is not Valid!");
            req.user = user;
            next(); 
        });
    }
    else{
        return res.status(400).json("You are not authenticated");
    }
};

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }
        else{
            res.status(403).json("Permission Denied!");
        }
    });
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }
        else{
            res.status(403).json("Permission Denied!");
        }
    })
}

module.exports = {verifyToken , verifyTokenAndAdmin ,verifyTokenAndAuthorization};
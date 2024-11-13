const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Register
router.post("/register" ,async (req,res)=>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString(),
    });
    
    try{
    //saving info to db
    const savedUser = await newUser.save();  // async await is used as it will take some time to save data to db , but without await it will directly execute console.log statement to prevent such error we used async await
    res.status(201).json(savedUser);
    console.log("user registered!!")
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Login

router.post("/login", async (req,res)=>{
    try{
    const user = await User.findOne({username : req.body.username});
    !user && res.status(401).json("Wrong credentials");
    const hashedPassword = CryptoJS.AES.decrypt(
        user.password, 
        process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        OriginalPassword !== req.body.password && res.status(401).json("wrong credentials");

        //JWT TOKEN
        const accessToken = jwt.sign({
            id:user._id, 
            isAdmin : user.isAdmin,
        },
        process.env.JWT_SEC,
        {expiresIn:"3d"}  
        );
        
        
        
        const { password, ...others } = user._doc //mongodb stores everything in doc

        res.status(200).json({...others, accessToken});
    }
    catch(err){
        res.status(500).json(err);
    }
});




module.exports = router
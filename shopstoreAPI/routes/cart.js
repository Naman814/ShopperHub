const Cart = require("../models/Cart");
const { verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


const router = require("express").Router();

//create cart
router.post("/", verifyToken, async (req,res)=>{
    const newCart = new Cart(req.body)

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//updating cart
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
   
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        }, {new:true}
        );
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete cart
router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await Cart.findByIdAndUpdate(req.params.id)
        res.status(200).json("Cart deleted successfully!")
    }
    catch{
        res.status(500).json(err);
    }
})

//get cart
router.get("/find/:userId",verifyTokenAndAuthorization , async (req,res)=>{  //everybody can see products so admin token removed
    try{
        const cart = await Cart.findOne({userId : req.params.userId});
        res.status(200).json(cart);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//get all 
router.get("/", verifyTokenAndAdmin, async (req,res)=>{ //only admin can see all the carts of all users
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }catch{
        res.status(500).json(err);
    }
})


module.exports = router
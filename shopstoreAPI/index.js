const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
var cors = require('cors');

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connection success")).catch((err)=>{
    console.log(err);
})


app.use(cors())
app.use(express.json()); // to accept json data


app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout", stripeRoute);


app.listen(3000,()=>{
    console.log("Backend server running on port 3000");
})
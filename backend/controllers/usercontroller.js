const asynchandler=require("express-async-handler")
const U_model=require("../models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const register=asynchandler(async(req,res)=>{
    const {username,phone,password}=req.body
    if(!username || !phone || !password){
        res.status(400)
        throw new Error("Please fill all mandatory fields")
    }
    const user_available=await U_model.findOne({phone:phone})
    if(user_available){
        res.status(400)
        throw new Error("Phone number already in use")
    }
    const Hashed_pass=await bcrypt.hash(password,10)

    const user=await U_model.create({
        username,
        phone,
        password:Hashed_pass
       })
     if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            phone: user.phone
        });
    } else {
        res.status(500);
        throw new Error("Failed to create user");
    }
    
}) 

const login=asynchandler(async(req,res)=>{
    const{username,password}=req.body
    if(!username || !password){
        res.send("All fields are mandatory")
    }
    const user=await U_model.findOne({username:username})
    if(user && await bcrypt.compare(password,user.password)){
   const accessToken=jwt.sign({
    user:{
        username:user.username,
        id:user.id
    },
   },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"10m"}
    )
    res.status(200).json(accessToken)
    }
    else{
        res.status(401)
        throw new Error("username or password is invalid")
    }
}) 

const current=asynchandler(async(req,res)=>{
    res.send("Hello")
}) 


module.exports={register,login,current}
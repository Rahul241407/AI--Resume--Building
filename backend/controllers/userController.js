import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// GENERATE A TOKEN JWT
const generateToken = (userId) => {
  return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'7d'});

} 

export const registerUser= async (req,res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }
      const {name,email,password} = req.body;
      if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

      // check if user already exists
      const userExist=await User.findOne({email})
      if(userExist){
        return res.status(400).json({message:"user already exists"});
      }
      if(password.length < 8){
        return res.status(400).json({success:false,message:"password must be alteast of 8 characters"});
      }

      // HASHING PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password,salt)

      // CREATE A USER
      const user= await User.create({
        name,
        email,
        password:hashedpassword,
      });
      res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
      });

  } catch (error) {
    res.status(500).json({
      message:"server error",
      error:error.message
    });
  }
};

// LOGIN FUNCTION
export const loginUser = async (req,res) => {
  try {
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
          return res.status(500).json({message:"invalid email or password"});
        }

        // COMPARE THE PASSWORD
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
          return res.status(500).json({message:"invalid email or password"});
        }
        res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
      });

  } catch (error) {
    res.status(500).json({
      message:"server error",
      error:error.message
    });
  }
};

// GETUSER PROFILE FUNCTION
export const getUserProfile = async (req,res) => {
  try {
    const user=await User.findById(req.user.id).select("-password");
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({
      message:"server error",
      error:error.message
    });
  }
};
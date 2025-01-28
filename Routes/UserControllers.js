const User = require('../model/User');
const jwt = require('jsonwebtoken');
const JWTKEY = "wdwdjwdkwjdkwmdwmxiwmdiwhdwdiwjdiwjwedwrwdw";
const bcrypt = require('bcrypt');

const SignUp = async (req,res) => {
    try{
        const {email,password,name} = req.body;
        const ExsitUser = await User.findOne({email});
    
        if(!ExsitUser){
            const newUser = new User({
                name,
                email,
                password,
            })
            await newUser.save();
            return res.status(200).json({success:true, newUser });
        }

        res.status(500).json({success:false,message:"User has exsited"})
    }catch(err){
        res.status(500).json({success:false,message:"User created failed"})
        console.log(err);
    }
}

const Login = async(req,res) => {
    try{
        const { email, password } = req.body;
  
        // Validate input
        if (!email || !password) {
          return res.status(400).json({ success: false, error: "Email and password are required" });
        }
    
        // Check if the user exists
        const exsiteUser = await User.findOne({ email });
        if (!exsiteUser) {
          return res.status(404).json({ success: false, error: "User not found" });
        }
    
        // Compare passwords
        const isMatched = await bcrypt.compare(password, exsiteUser.password);
        if (!isMatched) {
          return res.status(404).json({ success: false, error: "Password is not correct" });
        }
  
        const token = jwt.sign({ _id:exsiteUser._id},JWTKEY,{expiresIn:"10d"});

        res.status(200).json({
            success:true,
            token,
            user:{
              id:exsiteUser._id,
              name:exsiteUser.name,
              email:exsiteUser.email,
            }})
    }catch(error){
        console.log(error);
    }
}

module.exports ={SignUp, Login};


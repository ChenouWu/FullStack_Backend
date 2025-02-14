const User = require('../model/User');
const jwt = require('jsonwebtoken');
const JWTKEY = "wdwdjwdkwjdkwmdwmxiwmdiwhdwdiwjdiwjwedwrwdw";
const bcrypt = require('bcrypt');

const SignUp = async (req, res) => {
    try {
        const { email, password, name } = req.body;

    
        const existingUser = await User.findOne({ email });
       

        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" }); 
        }

          const hashedPassword = await bcrypt.hash(password, 10);
          console.log("Hashed Password:", hashedPassword); 

        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,  
        });

        await newUser.save();

        return res.status(201).json({ success: true, newUser });

    } catch (err) {
        console.log("Error in SignUp:", err);
        res.status(500).json({ success: false, message: "User creation failed" });
    }
};
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🛑 Validate input
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required" });
        }

        // 🔍 Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ success: false, error: "Invalid email or password" });
        }

        // 🔑 Compare passwords
        const isMatched = await bcrypt.compare(password, existingUser.password);
        if (!isMatched) {
            return res.status(401).json({ success: false, error: "Invalid email or password" });
        }

        // 🔑 Generate Token
        const token = jwt.sign({ userId: existingUser._id }, JWTKEY, { expiresIn: "10d" });


        // ✅ Return success response
        return res.status(200).json({
            success: true,
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            }
        });

    } catch (error) {
        console.error(error); // 🛑 让错误显示在终端
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

module.exports ={SignUp, Login};


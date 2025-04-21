import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({
      success: false,
      message: "Please provide the detials",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists.Please Login...",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    newUser.save();

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

     res.json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exists.Please Register..",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Wrong password..",
      });
    }

    const token = jwt.sign(
      { id: user._id  },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

     res.status(200).json({
      success: true,
      message: "Logined Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
}

export async function checkAuth(req,res) {
  const token=req.cookies.token;

 
  

  if(!token){
    return res.json({success:false,message:"Not Authenticated"})
  }

  const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);  

  if (!decoded) return res.status(403).json({success:false, message: "Token is invalid" });

  res.status(200).json({success:true,message:'Authenticated'});
}

export async function logout(req, res) {
  res.clearCookie("token");

   res.json({
    success: true,
    message: "LoggedOut Successsfully",
  });
}
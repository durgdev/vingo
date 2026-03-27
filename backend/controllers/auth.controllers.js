// // import User from "../models/user.model.js"
// // import bcrypt from "bcryptjs"
// // import genToken from "../utils/token.js"
// // export const signUp=async (req,res)=>{
// //    try {
// //       const {fullName,email,password,mobile,role}=req.body
// //     let user = await User.findOne({email})
// //     if(user){
// //         return res.status(400).json({message:"User Already exist"})
// //     }
// //     if(password.length<4){
// //         return res.status(400).json({message:"password must be at least 4 characters"})
// //     }
// //     if(mobile.length<10){
// //          return res.status(400).json({message:"mobile number must be at least 10 digit"})
// //     }
// //     const hashedPassword=await bcrypt.hash(password,10)
// //     user=await User.create({
// //         fullName,
// //         email,
// //         password:hashedPassword,
// //         role,
// //         mobile
// //     })

// //     const token=genToken(user._id)

// //     res.cookie("token",token,{
// //     secure:false,
// //     sameSite:"strict",
// //     httpOnly:true,
// //     maxAge:7*24*60*60*1000
// //     })
    
// //     return res.status(201).json(user)
// //    } catch (error) {
// //     return res.status(500).json(`sign up error ${error}`)
// //    }
// // }



// // export const signIn=async (req,res)=>{
// //    try {
// //       const {email,password}=req.body
// //     let user = await User.findOne({email})
// //     if(!user){
// //         return res.status(404).json({message:"User not exist"})
// //     }
// //    const ismatch= await bcrypt.compare(password,user.password)
// //    if(!ismatch){
// //        return res.status(400).json({message:"Incorrect password"}) 
// //    }

// //     const token=genToken(user._id)

// //     res.cookie("token",token,{
// //     secure:false,
// //     sameSite:"strict",
// //     httpOnly:true,
// //     maxAge:7*24*60*60*1000
// //     })
    
// //     return res.status(200).json(user)
// //    } catch (error) {
// //     return res.status(500).json(`signIn error ${error}`)
// //    }
// // }

// // export const signOut=async(req,res)=>{
// //       try {
// //          res.clearCookie("token")
// //          return res.status(200).json({message:"log Out successfully"})
// //       } catch (error) {
// //           return res.status(500).json(`sign out error ${error}`)
// //       }
// // }

// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import genToken from "../utils/token.js";
// import nodemailer from "nodemailer";
 
// // ================= SIGN UP =================
// export const signUp = async (req, res) => {
//   try {
//     const { fullName, email, password, mobile, role } = req.body;

//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: "User Already exist" });
//     }

//     if (password.length < 4) {
//       return res.status(400).json({ message: "password must be at least 4 characters" });
//     }

//     if (mobile.length < 10) {
//       return res.status(400).json({ message: "mobile number must be at least 10 digit" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user = await User.create({
//       fullName,
//       email,
//       password: hashedPassword,
//       role,
//       mobile
//     });

//     const token = genToken(user._id);

//     res.cookie("token", token, {
//       secure: false,
//       sameSite: "strict",
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     });

//     return res.status(201).json(user);

//   } catch (error) {
//     return res.status(500).json({ message: "sign up error", error });
//   }
// };


// // ================= SIGN IN =================
// export const signIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not exist" });
//     }

//     const ismatch = await bcrypt.compare(password, user.password);
//     if (!ismatch) {
//       return res.status(400).json({ message: "Incorrect password" });
//     }

//     const token = genToken(user._id);

//     res.cookie("token", token, {
//       secure: false,
//       sameSite: "strict",
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     });

//     return res.status(200).json(user);

//   } catch (error) {
//     return res.status(500).json({ message: "signIn error", error });
//   }
// };


// // ================= SIGN OUT =================
// export const signOut = async (req, res) => {
//   try {
//     res.clearCookie("token");
//     return res.status(200).json({ message: "log Out successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "sign out error", error });
//   }
// };


// // ================= SEND OTP =================
// export const sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email required" });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 🔥 Generate random OTP
//     const otp = Math.floor(1000 + Math.random() * 9000).toString();

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

//     await user.save();

//     console.log("OTP:", otp); // testing

//     return res.json({ message: "OTP sent successfully" });

//   } catch (error) {
//     return res.status(500).json({ message: "sendOtp error", error });
//   }
// };


// // ================= VERIFY OTP =================
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (user.otp !== otp || user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     return res.json({ message: "OTP verified" });

//   } catch (error) {
//     return res.status(500).json({ message: "verifyOtp error", error });
//   }
// };


// // ================= RESET PASSWORD =================
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     user.password = hashedPassword;

//     // clear OTP after success
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     return res.json({ message: "Password reset successful" });

//   } catch (error) {
//     return res.status(500).json({ message: "resetPassword error", error });
//   }
// };
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import nodemailer from "nodemailer";

// ✅ CREATE TRANSPORTER (ADD THIS)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// ================= SIGN UP =================
export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already exist" });
    }

    if (password.length < 4) {
      return res.status(400).json({ message: "password must be at least 4 characters" });
    }

    if (mobile.length < 10) {
      return res.status(400).json({ message: "mobile number must be at least 10 digit" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      mobile
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json(user);

  } catch (error) {
    return res.status(500).json({ message: "sign up error", error });
  }
};


// ================= SIGN IN =================
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exist" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: "signIn error", error });
  }
};


// ================= SIGN OUT =================
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "log Out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "sign out error", error });
  }
};


// ================= SEND OTP =================
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
        
        
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    // ✅ SEND EMAIL HERE
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`,
    });

    return res.json({ message: "OTP sent to email" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};


// ================= VERIFY OTP =================
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    return res.json({ message: "OTP verified" });

  } catch (error) {
    return res.status(500).json({ message: "verifyOtp error", error });
  }
};


// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.json({ message: "Password reset successful" });

  } catch (error) {
    return res.status(500).json({ message: "resetPassword error", error });
  }
};
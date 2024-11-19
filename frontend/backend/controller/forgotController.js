const {generateOTP,sendOTPEmail}=require("../services/otpService")
const OTP= require('../models/otp.model')
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
//verify OTP and password

const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const employee = await User.findOne({ email });
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      const OTPCode = generateOTP(6);
  
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  
      await OTP.findOneAndUpdate(
        { email: email },
        { email: email, otp: OTPCode, expiresAt: expiresAt },
        { upsert: true }
      );
  
      const emailSent = await sendOTPEmail(
        employee.email,
        employee.name,
        OTPCode
      );
      if (!emailSent) {
        return res.status(500).json({
          success: false,
          message: "Error sending OTP",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "OTP sent to registered email address",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };
  
//   const verifyOTPandResetPassword = async (req, res) => {
//     try {
//       const { email, otp, newPassword } = req.body;
  
//       // Find OTP record by email
//       const otpRecord = await OTP.findOne({ email });
//       if (!otpRecord) {
//         return res.status(404).json({
//           success: false,
//           message: "OTP not found",
//         });
//       }
  
//       // Check if the OTP is correct and not expired
//       if (otpRecord.otp !== otp || otpRecord.expiresAt < Date.now()) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid or expired OTP",
//         });
//       }
  
//       // Find employee by email
//       const employee = await User.findOne({ email });
//       if (!employee) {
//         return res.status(404).json({
//           success: false,
//           message: "Employee not found",
//         });
//       }
  
//       // Hash the new password before saving
//       const hashedPassword = await hashPassword(newPassword);
//       employee.password = hashedPassword;
//       await employee.save();
  
//       // Remove the OTP record after successful password reset
//       await OTP.deleteOne({ email: email });
  
//       res.status(200).json({
//         success: true,
//         message: "Password reset successful",
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: "Something went wrong",
//       });
//     }
//   };
  
  


const verifyOTPandResetPassword = async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
  
      // Validate request body
      if (!email || !otp || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "All fields are required (email, otp, newPassword)",
        });
      }
  
      // Find OTP record by email
      const otpRecord = await OTP.findOne({ email });
      if (!otpRecord) {
        return res.status(404).json({
          success: false,
          message: "OTP not found",
        });
      }
  
      // Check if the OTP matches and is not expired
      if (otpRecord.otp !== otp || otpRecord.expiresAt < Date.now()) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired OTP",
        });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Update the user's password (it will be hashed automatically by the pre-save hook)
      user.password = newPassword;
      await user.save();
  
      // Remove the OTP record after successful password reset
      await OTP.deleteOne({ email });
  
      res.status(200).json({
        success: true,
        message: "Password reset successful",
      });
    } catch (error) {
      console.error("Error in verifyOTPandResetPassword:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong, please try again",
      });
    }
  };
  
  module.exports={
    forgotPassword,
    verifyOTPandResetPassword
  }


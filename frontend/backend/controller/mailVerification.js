const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const Mailgen = require("mailgen"); // Note the capitalization

exports.emailVerification = async (userEmail) => {
  try {
    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Create a Mailgen instance
    const mailGenerator = new Mailgen({
      theme: "default", // Choose a theme or customize as needed
      product: {
        name: "Tourify",
        link: "http://localhost:3000",
      },
    });

    // Generate the email content
    const email = {
      body: {
        name: "User", // Replace with the recipient's name
        intro: "Welcome to Tourify!",
        outro: "You have been successfully registered for our website.",
      },
    };

    // Generate the email HTML
    const emailBody = mailGenerator.generate(email);

    // Generate the plaintext version of the email (optional)
    const emailText = mailGenerator.generatePlaintext(email);

    // Send the email
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Welcome to Tourify",
      html: emailBody,
      text: emailText, // Include plaintext version
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
//for approving booking //

exports.ApprovedBookingEmailSent = async (userEmail) => {
  try {
    // Create a nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Create a Mailgen instance
    const mailGenerator = new Mailgen({
      theme: "default", // Choose a theme or customize as needed
      product: {
        name: "Tourify",
        link: "http://localhost:3000",
      },
    });

    // Generate the email content
    const email = {
      body: {
        name: "Customer", // Replace with the recipient's name
        intro: "Your booking with Tourify has been approved.",
        outro:
          "Please feel free to contact us at any time for further information or assistance. You can reach us at +977 9869044193.",
      },
    };

    // Generate the email HTML
    const emailBody = mailGenerator.generate(email);

    // Generate the plaintext version of the email (optional)
    const emailText = mailGenerator.generatePlaintext(email);

    // Send the email
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Booking Confirmation - Tourify",
      html: emailBody,
      text: emailText, // Include plaintext version
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

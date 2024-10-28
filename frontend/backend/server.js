// const app = require("./app");
// const connectDB = require("./config/databaseConfig");
// const dotenv = require("dotenv");
// dotenv.config({ path: "./config/.env" });
// const cors = require("cors");
// app.use(cors());

// const cloudinary = require("cloudinary");
// const bodyParser = require("body-parser");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// connectDB();
// app.listen(process.env.PORT, () => {
//   console.log(`server started at port ${process.env.PORT}`);
// });


const express = require("express");
const app = require("./app"); // Assuming app.js handles your middleware setup
const connectDB = require("./config/databaseConfig");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config({ path: "./config/.env" });

// Enable CORS
app.use(cors());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Import recommendation route
const recommendationRoute = require("../backend/routes/recommendationRoutes");

// Use body parser to handle JSON requests
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Use the recommendation route
app.use("/api", recommendationRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

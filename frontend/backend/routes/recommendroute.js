const express = require("express");
const { getCollaborativeRecommendations } = require("../controller/recommendationController");

const router = express.Router();

// Define the GET route for collaborative recommendations
router.get("/collaborative-recommendations", getCollaborativeRecommendations);

module.exports = router;

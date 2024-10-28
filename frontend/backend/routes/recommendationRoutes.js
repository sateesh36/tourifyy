const express = require("express");
const { getCollaborativeRecommendations } = require("../controller/recommendationController");
const router = express.Router();

router.get("/collaborative-recommendations", getCollaborativeRecommendations);

module.exports = router;

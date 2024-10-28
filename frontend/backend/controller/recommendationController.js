// controllers/recommendationController.js
const mongoose = require("mongoose");
const Review = require("../models/ratingModel");
const Tour = require("../models/tourModel");

// Cosine Similarity function
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Collaborative Filtering Algorithm
const getCollaborativeRecommendations = async (req, res) => {
  try {
    // Fetch all reviews with user and tour IDs
    const reviews = await Review.find().populate("tourID");

   
    const userTourMatrix = {};
    const tours = {}; 
    const users = {};

    reviews.forEach((review) => {
      const userID = review._id;
      const tourID = review.tourID._id;
      const rating = review.rating;

      if (!userTourMatrix[userID]) {
        userTourMatrix[userID] = {};
      }

      userTourMatrix[userID][tourID] = rating;
      tours[tourID] = review.tourID;
      users[userID] = true;
    });

    
    const tourIDs = Object.keys(tours);
    const similarityMatrix = {};

    for (let i = 0; i < tourIDs.length; i++) {
      for (let j = i + 1; j < tourIDs.length; j++) {
        const tourA = tourIDs[i];
        const tourB = tourIDs[j];

        const userRatingsA = [];
        const userRatingsB = [];

       
        for (const userID in userTourMatrix) {
          if (userTourMatrix[userID][tourA] && userTourMatrix[userID][tourB]) {
            userRatingsA.push(userTourMatrix[userID][tourA]);
            userRatingsB.push(userTourMatrix[userID][tourB]);
          }
        }

        if (userRatingsA.length > 0 && userRatingsB.length > 0) {
          const similarity = cosineSimilarity(userRatingsA, userRatingsB);
          if (!similarityMatrix[tourA]) {
            similarityMatrix[tourA] = {};
          }
          similarityMatrix[tourA][tourB] = similarity;
        }
      }
    }

   
    const userID = req.user._id;
    const userRatings = userTourMatrix[userID] || {};
    const recommendedTours = [];

    for (const tourID in userRatings) {
      const ratedTour = userRatings[tourID];
      const similarTours = similarityMatrix[tourID] || {};

      
      const sortedSimilarTours = Object.keys(similarTours).sort(
        (a, b) => similarTours[b] - similarTours[a]
      );

      
      sortedSimilarTours.forEach((similarTourID) => {
        if (!userRatings[similarTourID]) {
          recommendedTours.push({
            tourID: similarTourID,
            similarity: similarTours[similarTourID],
            tourDetails: tours[similarTourID],
          });
        }
      });
    }

   
    const topRecommendations = recommendedTours.slice(0, 5);

    res.status(200).json({
      success: true,
      data: topRecommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get recommendations",
      error: error.message,
    });
  }
};


module.exports = {
  getCollaborativeRecommendations,
};

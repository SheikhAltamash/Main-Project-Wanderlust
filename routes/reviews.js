const express = require("express");
const wrapAsync = require("../utils/wrapasync.js");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware.js");
const{validateReview,isReviewAuthor}=require("../middleware.js");
const reviewController = require("../controllers/review.js");

//reviews
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId", isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
const { Review } = require("../models/review.js");
const { listing } = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
  console.log(req.params.id);
  let list = await listing.findById(req.params.id);
  let { id } = req.params;
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  list.reviews.push(newReview);
  await newReview.save();
  await list.save();
  console.log("New Review : ", newReview);
  req.flash("success", "New Review Created !");
  res.redirect(`/listing/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted !");
  res.redirect(`/listing/${id}`);
};
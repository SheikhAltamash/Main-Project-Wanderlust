const { listing } = require("./models/listing.js");
const { Review } = require("./models/review.js");
const expressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./models/schema.js");

module.exports.isLoggedIn = (req, res, next) => {

  if (!req.isAuthenticated()) {
    //Redirect Url
    req.session.redirectUrl =req.originalUrl;

       req.flash(
         "error",
         "Login required"
       );
       return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl)
  {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let list = await listing.findById(id);

  if (!list.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not Owner !");
    return res.redirect("/listing/"+id);
  }
  next();
};

module.exports.validateFunction = (req, res, next) => {
  let result = listingSchema.validate(req.body);

  if (result.error) {
    throw new expressError(400, result.error);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let result = reviewSchema.validate(req.body);

  if (result.error) {
    throw new expressError(400, result.error);
  } else {
    next();
  }
};
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id,reviewId } = req.params;
  let list = await Review.findById(reviewId);

  if (!list.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You did not create this review !");
    return res.redirect("/listing/" + id);
  }
  next();
};
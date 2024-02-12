const { listing } = require("../models/listing.js");
const { Review } = require("../models/review.js");
module.exports.index = async (req, res) => {
  let allList = await listing.find();
  res.render("index.ejs", { allList });
};

module.exports.renderCreateForm = (req, res) => {
   res.render("new.ejs");  
};

module.exports.createNewListing = async (req, res, next) => {
  
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new listing(req.body.Listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save().then((res) => {
    console.log("Listed Successfully");
  });

  req.flash("success", "New Listing Created !");
  res.redirect("/listing");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const list = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  let rev = await Review.findById(list.reviews._id).populate("author");
  if (!list) {
    req.flash("error", "Listing you requested does not exist !");
    res.redirect("/listing");
  }
  res.render("show.ejs", { list, rev });
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  const list = await listing.findById(id);
  if (!list) {
    req.flash("error", "Listing you requested does not exist !");
    res.redirect("/listing");
  }
  res.render("edit.ejs", { list });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let data = req.body.Listing;
  let updatedListing=await listing.findByIdAndUpdate(id, data);
  if (typeof req.file!=="undefined") {
    let filename = req.file.filename;
    let url = req.file.path;
    updatedListing.image = { url, filename };
    await updatedListing.save();
  }
  console.log("Updated Listing Sucessfully");
  req.flash("success", "Listing Updated !");
  res.redirect("/listing/" + id);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await listing.findByIdAndDelete(id);
  console.log("deletedListing : ", deletedListing);
  req.flash("success", "Listing Deleted !");
  res.redirect("/listing");
};
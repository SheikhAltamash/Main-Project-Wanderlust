const express = require("express");
const wrapAsync = require("../utils/wrapasync.js");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {cloudinary,storage}=require("../cloudConfig.js");
const upload = multer({ storage});

// Index route
router.get("/", listingController.index);

// New Listing Creating routes
router.get("/create",isLoggedIn, listingController.renderCreateForm);
router.post("/", isLoggedIn,  upload.single("Listing[image]"),wrapAsync(listingController.createNewListing));


//Listing Showing route
router.get("/:id",listingController.showListing);

// Edit Listing route
router.get("/:id/edit", isLoggedIn,listingController.editForm);
router.patch("/:id", isLoggedIn, upload.single("Listing[image]"),listingController.editListing);

//Delete Listing route
router.delete("/delete/:id", isLoggedIn,listingController.deleteListing);
module.exports = router;

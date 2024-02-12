const mongoose = require('mongoose');
const {Review}=require("./review.js")
const { listingSchema } = require('./schema');
const User = require('./user.js');
const Schema = mongoose.Schema;
const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: Number,
  description: String,
  country: String,
  location: String,
  image: {
    url: String,
    filename:String,
  },
  reviews: [
    { type: Schema.Types.ObjectId,ref:"Review" },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  category:{type:String}
});

ListingSchema.post("findOneAndDelete", async (listing) => {

    await Review.deleteMany({ _id: { $in: listing.reviews } });
  
})
const listing = mongoose.model('Listing', ListingSchema);
module.exports = {listing};


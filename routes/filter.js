const express = require('express');
const router = express.Router({ mergeParams: true });
const { listing } = require("../models/listing.js");

router.get("/search", async (req, res) => {
  let { location } = req.query;
  console.log(location);
  let allList = await listing.find({$or:[{location: location},{country:location},{city:location},{title:location},{category:location}]});
 res.render("index.ejs",{allList,location}) 
});

router.get("/trending", async (req, res) => {
    let allList =await listing.find();
    res.render("filters/treanding.ejs",{allList})
});

router.get("/rooms", async (req, res) => {
  let allList = await listing.find();
  res.render("filters/room.ejs", { allList });
});

router.get("/cities", async (req, res) => {
  let allList = await listing.find();
  res.render("filters/cities.ejs", { allList });
});

router.get("/mountain", async (req, res) => {
  let allList = await listing.find();
  res.render("filters/mountain.ejs", { allList });
});

router.get("/pool", async (req, res) => {
  let allList = await listing.find();
  res.render("filters/pool.ejs", { allList });
});

router.get("/castels", async (req, res) => {
  let allList = await listing.find();
  res.render("filters/castels.ejs", { allList });
});

router.get("/farms", async (req, res) => {
  let allList = await listing.find();
  res.render("filters/farms.ejs", { allList });
});

router.get("/camping", async (req, res) => {
  let allList = await listing.find();
  res.render("filters/camping.ejs", { allList });
});

router.get("/villa", async (req, res) => {
  let allList = await listing.find();
  res.render("filters/villa.ejs", { allList });
});


module.exports = router;
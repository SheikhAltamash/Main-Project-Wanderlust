if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();

}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const mongooseUrl = process.env.MONGO_URL;
const mongooseUrl = "mongodb://127.0.0.1:27017/wanderlust";
const port = 8080;
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const expressError = require("./utils/ExpressError.js");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const cookie = require("cookie-parser");
const flash = require("express-flash");
const localStratergy = require('passport-local');
const User=require("./models/user.js");
const passport = require("passport");
const wrapasync = require("./utils/wrapasync.js");
const userRouter = require("./routes/user.js");
const filterRouter = require("./routes/filter.js");


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookie());



if (!mongooseUrl) {
  console.error("MongoDB connection URL is not provided.");
  process.exit(1);
}

const store = mongoStore.create({
  mongoUrl: mongooseUrl,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", (e) => {
  console.log("Error: "+e)
})
const sessionOption = {
  store: store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};


app.listen(port, (res, req) => {
    console.log("Server is  started");
});

async function main() {
  await mongoose.connect(mongooseUrl,{serverSelectionTimeoutMS: 30000 });
}
main()
  .then((res) => {
    console.log("Connection Sucessfull !");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res, next) => {
  res.redirect("/listing");
});

app.use(session(sessionOption));//This middleware is for session management

//Authentication middleware using passport library

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash middleware 
app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})

//middleware for routes 
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/", filterRouter);



// This route will catch the error and pass it to next middleware for handeling errors   
app.all("*", async (req, res, next) => {
  next(new expressError(404, "Page Not Found !!!"));//for calling next middleware
});

//Error Handeling middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Something Went Wrong" } = err;
    res.render('error.ejs',{message})
    //res.status(status).send(message);
});


app.use((req, res) => {
  //This middleware is for all the rest routes which are defined
  res.send("Page not found");
});
  

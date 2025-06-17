import express from 'express';
import Listing from './models/listing.model.js';
import connectToDatabase from './config/mongodb.conn.js';
import methodOverride from 'method-override';
import ejsMate from 'ejs-mate';
import { router } from './routes/listing.routes.js';
import reviewRouter from './routes/review.routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import Mongosession from 'connect-mongo'
import flash from 'express-flash';// mainly this will help you add popup alert in ejs.
import passport from 'passport';
import { User } from './models/user.model.js';
import LocalStrategy from 'passport-local';
import userRouter from './routes/user.routes.js'
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT;
const DB_URL = process.env.DB_CONNECTION_STRING;
const app = express();


connectToDatabase(DB_URL);

const store = Mongosession.create({
    mongoUrl:DB_URL,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*3600// after 24 hours it will ask you to login
})

store.on("error",(err)=>{
    console.log("Error in MongoDB Session Store",err);
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true
    }
}

app.use(flash());// flash
app.use(session(sessionOptions))
app.use(cookieParser("secretcode"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');// to render ejs file 

// use ejs-Mate for all ejs templates:
app.engine('ejs', ejsMate);

// related to passport for username and password
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next)=>{// related to flash
    res.locals.success = req.flash("success")
    res.locals.deleted = req.flash("deleted")
    res.locals.modified = req.flash("modified")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;// setting the user to the locals so that we can access inside ejs
    next()
})

// ******Landing Page*******
app.get('/', async (req, res) => {
    const lists = await Listing.find().limit(6)// limiting only give 6 results
    res.render('index', { lists, heading: "Home BudgetBnb" });
});

// ******USER*******
app.use('/',userRouter);
// ******LISTING*******
app.use('/listing', router);
// *****************REVIEWS************
app.use('/listing/:id/reviews', reviewRouter);

// 404 handler for undefined routes
app.use((req, res, next) => {
    res.status(404).render('notFound', { heading: "Page Not Found" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong.." } = err;
    res.status(status).render('errors.ejs', { err, heading: "Errors" })
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
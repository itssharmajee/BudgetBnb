import Listing from "../models/listing.model.js";
import Review from "../models/review.models.js";

export const userAuthMiddlware = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // console.log(req.originalUrl);
        req.session.redirectUrl = req.originalUrl;
            req.flash("error","UnAuth-Access ! you must login first!")
            return res.redirect('/signin')
    }
    next()
}

export const saveRedirectURL = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl; 
        // delete req.session.redirectUrl; // Clean up immediately after saving
    }
    next()
}

export const isOwner = async(req,res,next)=>{
    const {id} = req.params;
    const list = await Listing.findById(id);
        if(!list.owner._id.equals(res.locals.currUser._id)){
            req.flash("error","you are not owner of this listing..")
            return res.redirect(`/listing/${id}`)
        }
        next()
}



// this will check basically user is login or not if login it will redirect to listing else corresponding url ..

export const isLoggedIn = (req,res,next)=>{
    if(res.locals.currUser){
        return res.redirect('/listing')
    }
    next()
}

// check review Author
export const isAuthor = async(req,res,next)=>{
    const { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
        if(!review?.author._id.equals(res.locals.currUser._id)){
            req.flash("error","you are not author of this comment..")
            return res.redirect(`/listing/${id}`)
        }
        next()
}
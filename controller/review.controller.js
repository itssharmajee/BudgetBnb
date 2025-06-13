import { CustomError } from "../helper/ExpressCustomError.js";
import Listing from "../models/listing.model.js";
import Review from "../models/review.models.js";

export const createReview = async (req, res,next) => {
    const { id } = req.params;
    const {rating, comment} = req.body;
    if(!rating || !comment){
        throw new CustomError(400,"All fields are required")
    }
    let list = await Listing.findById(id);
    let review = await Review.create({
        comment,rating,author:req.user._id
    })
    
    list.reviews.push(review);
    await list.save()
    req.flash("success","Comment created Successfully...")
    res.redirect(`/listing/${id}`);
}

export const deleteReview = async (req, res,next) => {
    const { id,reviewId } = req.params;
await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("deleted","comment deleted Successfully...")
    res.redirect(`/listing/${id}`)
}
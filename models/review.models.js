import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true,
        trim: true, // Remove whitespace from both ends
        minlength: 10, // Minimum length of 3 characters
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Review = model('Review', reviewSchema);
export default Review;
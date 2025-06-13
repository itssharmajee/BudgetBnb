import mongoose, { Schema, set } from 'mongoose';
import Review from './review.models.js';
const imageURL = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, // Remove whitespace from both ends
        minlength: 3, // Minimum length of 3 characters
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    category:{
        type:String,
        enum:["villa","camping","towers","farms","castles"]
    },
    // image: {
    //     type: String,
    //     default: imageURL, // Default to an empty string if no image is provided
    //     set: function(value) {
    //         return value===""? imageURL: value; // If the value is an empty string, set it to default
    //     }
    // },
    image: {
        url:String,
        fileName:String
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},

{
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;

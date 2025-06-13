import mongoose from "mongoose";
import Listing from "../models/listing.model.js";
import sampleListings from "../init/sample.data.js"; // Import sample listings data
import connectToDatabase from "../config/mongodb.conn.js";
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });// resolving env

const DB_URL = process.env.DB_CONNECTION_STRING;
console.log(DB_URL);
connectToDatabase(DB_URL);
async function seedDatabase() {
    try {
        await Listing.deleteMany(); // Clear existing listings
        const listingsWithOwner = sampleListings.map((listing) => ({
            ...listing,
            owner: "6844641cf32d5192d9fdb5c6", // Add owner field
            createdAt: new Date(), // Add timestamps if needed
            updatedAt: new Date(),
        }));
        await Listing.insertMany(listingsWithOwner);
        console.log("Database seeded with sample listings");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}
seedDatabase()
    .then(() => {
        mongoose.connection.close(); // Close the connection after seeding
    })
    .catch((err) => {
        console.error("Error during seeding:", err);
    });

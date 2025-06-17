import { CustomError } from "../helper/ExpressCustomError.js";
import Listing from "../models/listing.model.js";

export const getListing = async (req, res, next) => {
    const lists = await Listing.find();
    res
        .status(200)
        .render("listings", { allListings: lists, heading: "all listings" });
};
export const createListing = async (req, res, next) => {
    const { title, description, price, location, category } = req.body;
    const { originalname, path, filename } = req.file;
    if (!title || !description || !price || !location || !category) {
        return res.status(400).send({ error: "All fields are required" });
    }
    await Listing.create({
        title,
        description,
        price,
        location,
        category,
        owner: req.user._id,
        // image: image || "", // Default to an empty string if no url image is provided
        image: {
            url: path,
            fileName: filename,
        },
    });
    req.flash("success", "New Listing added successfully..");
    res.status(201).redirect("/listing");
};

// export const filteredData = async (req, res) => {
//     try {
//         const { location, category } = req.query;
//         console.log(req.query);
        
//         // If no filters provided, return all listings or handle differently
//         if (!location && !category) {
//             req.flash("error", "Please provide at least one filter parameter");
//             return res.redirect("/listing");
//         }
//         if (location && !category) {
//             const listings = await Listing.find({ location: new RegExp(location, 'i') });
//             console.log(listings);

//             return res.status(200).render("listings", {
//                 allListings: listings,
//                 heading: "Filtered Listings"
//             });
//         }
//         if (category && !location) {
//             const listings = await Listing.find({ category: new RegExp(category, 'i') });
//             console.log(listings);

//             return res.status(200).render("listings", {
//                 allListings: listings,
//                 heading: "Filtered Listings"
//             });
//         }

//         if (category && location) {
//     const listings = await Listing.find({
//         location: { $regex: location, $options: 'i' },
//         category: { $regex: `^${category}$`, $options: 'i' } // ^$ for exact match but case-insensitive
//     });
//         return res.status(200).render("listings", {
//             allListings: listings,
//             heading: "Filtered Listings"
//         });
// }


//     } catch (error) {
//         console.error("Error filtering listings:", error);
//         req.flash("error", "Failed to filter listings");
//         return res.redirect("/listing");
//     }
// };


export const filteredData = async (req, res) => {
    try {
        const { location, category } = req.query;
        
        if (!location && !category) {
            req.flash("error", "Please provide at least one filter parameter");
            return res.redirect("/listing");
        }

        // Build query dynamically
        const query = {};
        if (location) query.location = { $regex: location, $options: 'i' };
        if (category) query.category = { $regex: `^${category}$`, $options: 'i' };

        const listings = await Listing.find(query);
        if(listings.length === 0){
            req.flash("error","No data found based on filteration");
            return res.redirect("/listing");
        }
        
        return res.status(200).render("listings", {
            allListings: listings,
            heading: getHeading(location, category)
        });

    } catch (error) {
        console.error("Error filtering listings:", error);
        req.flash("error", "Failed to filter listings");
        return res.redirect("/listing");
    }
};

// Helper function for dynamic heading
const getHeading = (location, category) => {
    if (location && category) return `${category} in ${location}`;
    if (location) return `Listings in ${location}`;
    if (category) return `${category} listings`;
    return "Filtered Listings";
};





export const gettingListById = async (req, res, next) => {
    const { id } = req.params;
    if (id.length != 24) {
        throw new CustomError(400, "Invalid Id");
    }
    const list = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!list) {
        req.flash("deleted", "List you are trying to access does not exist");
        res.redirect("/listing");
        return;
    }
    res.status(200).render("detail", { list: list, heading: list.title });
};
export const renderNewListForm = (req, res) => {
    // this route you can not write after /listing/:id because it will try to find out inside the database or gives errors...
    // console.log(req.user);
    res.render("new", { heading: "create new Listing" });
};
export const renderUpdateListForm = async (req, res, next) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    if (!list) {
        req.flash("error", "List you are trying to access does not exist");
        return res.redirect("/listing");
    }
    list.image.url = list.image.url.replace('/upload', '/upload/c_crop,h_200,w_300') // we are changing image quality as well as ratio so that it loads faster not actual image size/quality
    res.status(200).render("updateListing", { list: list, imageURL: list.image.url, heading: list.title });
};

export const updateListing = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, price, location } = req.body;
    if (!title || !description || !price || !location) {
        throw new CustomError(400, "All fields are required");
    }
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true });
    if (typeof req.file !== 'undefined') {
        const { path, filename } = req.file;
        listing.image = { url: path, fileName: filename }
        await listing.save();
    }
    req.flash("modified", "Listing modified Successfully...");
    res.status(201).redirect(`/listing/${id}`);
};
export const deleteListing = async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("deleted", "Listing deleted successfully..");
    res.redirect("/listing");
};

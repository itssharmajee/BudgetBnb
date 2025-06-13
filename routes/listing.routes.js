import express from "express";
import wrapAsync from "../helper/wrapAsync.js";
import { isOwner, userAuthMiddlware } from "../middlewares/userAuth.js";
import {
    createListing,
    deleteListing,
    filteredData,
    getListing,
    gettingListById,
    renderNewListForm,
    renderUpdateListForm,
    updateListing,
} from "../controller/listing.controller.js";
import multer from "multer";
import { storage } from "../config/cloudinary.config.js";
const upload = multer({ storage })
const router = express.Router();

// router.post("/", userAuthMiddlware, wrapAsync(createListing));
// router.get("/", wrapAsync(getListing));

router
    .route("/")
    .get(wrapAsync(getListing))
    .post(userAuthMiddlware,upload.single('image'), wrapAsync(createListing));// image the the name="image" in the input field

router.get("/new", userAuthMiddlware, renderNewListForm);

router.get('/listing-filtered-data',filteredData)

// router.get("/:id", wrapAsync(gettingListById));
// router.patch("/:id", userAuthMiddlware, isOwner, wrapAsync(updateListing));
// router.delete("/:id", userAuthMiddlware, isOwner, wrapAsync(deleteListing));
router
    .route("/:id")
    .get(wrapAsync(gettingListById))
    .patch(userAuthMiddlware, isOwner,upload.single('image'),wrapAsync(updateListing))
    .delete(userAuthMiddlware, isOwner, wrapAsync(deleteListing));

router.get(
    "/:id/list",
    userAuthMiddlware,
    isOwner,
    wrapAsync(renderUpdateListForm)
);

export { router };

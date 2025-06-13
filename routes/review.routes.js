import express from "express";
import wrapAsync from "../helper/wrapAsync.js";
import { isAuthor, userAuthMiddlware } from "../middlewares/userAuth.js";
import { createReview, deleteReview } from "../controller/review.controller.js";
/** mergeParams: true
By default, each router instance in Express has its own set of parameters. This means that parameters defined in a parent route (e.g., /:id) are not automatically available in child routers.
Setting mergeParams: true ensures that the parameters from the parent route are merged into the child router's req.params object.
This is particularly useful when you are working with nested routes and need access to parameters defined in the parent route. */
const router = express.Router({mergeParams:true})

router.post('/',userAuthMiddlware, wrapAsync(createReview))
// if we delete a review their Id will also be removed from listing review list...
router.delete('/:reviewId',userAuthMiddlware,isAuthor, wrapAsync(deleteReview))

export default router;
import express from "express";
import wrapAsync from "../helper/wrapAsync.js";
import passport from "passport";
import { isLoggedIn, saveRedirectURL, userAuthMiddlware } from "../middlewares/userAuth.js";
import {
    createUser,
    logoutUser,
    renderUserSignInForm,
    renderUserSignupForm,
    signInUser,
    userProfile,
} from "../controller/user.controller.js";
const router = express.Router();

router
    .route("/signup")
    .get(isLoggedIn, wrapAsync(renderUserSignupForm))
    .post(wrapAsync(createUser));

router
    .route("/signin")
    .get(isLoggedIn, wrapAsync(renderUserSignInForm))
    .post(
        saveRedirectURL,
        passport.authenticate("local", {// local strategy is being used here...
            // as it delete session so we are using saveRedirectURL before it
            failureFlash: true,
            failureRedirect: "/signin",
        }),
        wrapAsync(signInUser)
    );
    router.get('/profile',userAuthMiddlware,userProfile)
router.get("/logout", logoutUser);

export default router;

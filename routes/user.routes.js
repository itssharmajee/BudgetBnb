import express from "express";
import wrapAsync from "../helper/wrapAsync.js";
import passport from "passport";
import { isLoggedIn, saveRedirectURL } from "../middlewares/userAuth.js";
import {
    createUser,
    logoutUser,
    renderUserSignInForm,
    renderUserSignupForm,
    signInUser,
} from "../controller/user.controller.js";
const router = express.Router();

// router.get('/profile',(req,res)=>{
//     res.render('user/profile.ejs',{heading:"profile"})
// })

router
    .route("/signup")
    .get(isLoggedIn, wrapAsync(renderUserSignupForm))
    .post(wrapAsync(createUser));

router
    .route("/signin")
    .get(isLoggedIn, wrapAsync(renderUserSignInForm))
    .post(
        saveRedirectURL,
        passport.authenticate("local", {
            // as it delete session so we are using saveRedirectURL before it
            failureFlash: true,
            failureRedirect: "/signin",
        }),
        wrapAsync(signInUser)
    );

router.get("/logout", logoutUser);

export default router;

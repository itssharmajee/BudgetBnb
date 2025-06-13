import {User} from '../models/user.model.js'
export const renderUserSignupForm = async (req, res) => {
    res.render("user/signup.ejs", { heading: "new user registration" });
};

export const createUser = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        // let regUser = await User.register({username,email},password) // this will also work perfectly

        let newUser = new User({
            email,
            username,
        });

        let regUser = await User.register(newUser, password);
        // Properly handle the login
        req.login(regUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash(
                "success",
                "You have successfully registered. Welcome to BudgetBnb!"
            );
            return res.redirect("/listing");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

export const renderUserSignInForm = async (req, res) => {
    res.render("user/signin.ejs", { heading: "Login to BudgetBnb" });
};

export const signInUser = async (req, res) => {
    req.flash("success", "Welcome back to BudgetBnb!");
    let redirectURL = res.locals?.redirectUrl || "/listing";
    // console.log(res.locals?.redirectUrl);
    return res.redirect(`${redirectURL}`);
};

export const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log("logout.................");
            return next(err);
        }
        req.flash("success", " User Logout Successfully.");
        return res.redirect("/");
    });
};

const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapAsync");
const passport = require("passport");
const usersSchema = require("../Models/userModel"); // Consistency in naming
const LocalStrategy = require("passport-local");

// Correctly set up the Passport strategy with `userModel.authenticate()` method
passport.use(new LocalStrategy(usersSchema.authenticate()));

// Passport serialization and deserialization
passport.serializeUser(usersSchema.serializeUser());
passport.deserializeUser(usersSchema.deserializeUser());




// Get Routes ------->

router.get('/', (req, res) => {
    res.json('You are at the auth route');
});

router.get('/user-signup', (req, res) => {
    res.json('You should send a POST on this route.');
});

router.get('/user-login', (req, res) => {
    res.json('You should send a POST on this route.');
});

// Post Routes ------->

// Use wrapAsync to wrap the whole route handler
router.post('/user-signup', wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new usersSchema({ email, username }); // Consistency
        const regtUser = await usersSchema.register(newUser, password);
        console.log(regtUser);

        req.login(regtUser, (err) => {
            if (err) {
                return next(err);
            }
            res.json({
                message: "Signup successful"
            });
        });
    } catch (e) {
        res.status(400).json({ error: 'Signup failed' });
    }
}));

router.post('/user-login', 
    passport.authenticate("local", {
        failureRedirect: "/user-login", // This could also return a JSON response if needed
        failureMessage: true // Optional: Send a message back
    }),
    (req, res) => {
        res.json({
            message : "Login Success"
        }); // You might want to send a JSON response if this is an API
    }
);

//// logout route 

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        res.json({
            message : "logout success"
        });
    });
    });
    

module.exports = router;

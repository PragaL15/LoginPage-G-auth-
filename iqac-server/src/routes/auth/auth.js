const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const router = express.Router();

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Ensure req.user is defined and has an id
    if (req.user && req.user.id) {
      // Generate the token
      const token = generateToken(req.user, 600);  // Generate token for 10 minutes
      console.log("JWT Token:", token); 
      
      // Redirect to dashboard with token
      res.redirect(`http://localhost:5173/dashboard?token=${token}`);
    } else {
      // Handle case where user is not authenticated
      res.redirect("/");
    }
  }
);

const generateToken = (user, expiresIn) => {
  const JWT_SECRET = process.env.JWT_SECRET || "my_long_and_random_secret_key_here";
  return jwt.sign({ userId: user.id }, 'my_long_and_random_secret_key_here', { expiresIn });
};

module.exports = router;

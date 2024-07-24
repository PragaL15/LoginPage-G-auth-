const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authRoutes = require("./routes/auth/auth");
const passportStrategy = require("./config/passport_config");

dotenv.config();

// Middleware for generating JWT token
const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '30s' });
};

// Middleware logger config
const morgan_config = morgan(":method :url :status :res[content-length] - :response-time ms");

const app = express();
const port = 3000;

// Enable CORS and logger middleware
app.use(
    session({
        secret: 'my_secret_key_is_iqac',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 30000,
            name: "cookie_die",
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use(morgan_config);
app.use(express.json());

// Example authentication route
app.post("/auth/login", (req, res) => {
    const { email, username } = req.body;

    // Validate email domain
    if (!email.endsWith('@bitsathy.ac.in')) {
        return res.status(400).json({ message: 'Please sign in with a BITSathy email ID.' });
    }

    // Assuming you have some authentication logic here...
    const user = {
        id: 1,
        username: username,
        email: email,
        // Other user properties...
    };

    // Generate a token for the authenticated user
    const token = generateToken(user);

    // Send the token back to the client
    res.json({ token });
});

// Use auth routes
app.use("/auth", authRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

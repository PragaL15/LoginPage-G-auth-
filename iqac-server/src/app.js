const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/auth/auth");
const passportStrategy = require("./config/passport_config");
const { getCalendarEvents, refreshAccessToken } = require("./routes/auth/accesstoken");

dotenv.config();

// Middleware for generating JWT token
const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET || 'my_long_and_random_secret_key_here', { expiresIn: '30s' });
};

// Middleware logger config
const morgan_config = morgan(":method :url :status :res[content-length] - :response-time ms");

const app = express();
const port = 3000;

app.use(
    session({
        secret: 'my_secret_key_is_iqac',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 30000, // 30 seconds for demo; adjust as needed
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

// Middleware to check if the user is authenticated using JWT
const ensureAuthenticated = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Please log in again.' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'my_long_and_random_secret_key_here', (err, decoded) => {
        if (err) {
            console.error(err); // Log error for debugging
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please log in again.' });
            } else {
                return res.status(401).json({ message: 'Token is not valid. Please log in again.' });
            }
        }
        req.user = decoded.user;
        console.log(`Token valid until: ${new Date(decoded.exp * 1000)}`); // Debugging: Log the expiration date
        next();
    });
};

// Example authentication route
app.post("/auth/login", (req, res) => {
    const { email, username } = req.body;

    if (!email.endsWith('@bitsathy.ac.in')) {
        return res.status(400).json({ message: 'Please sign in with a BITSathy email ID.' });
    }

    const user = {
        id: 1,
        username: username,
        email: email,
    };

    const token = generateToken(user);

    res.json({ token });
});

// Use auth routes
app.use("/auth", authRoutes);

// Example protected route
app.get('/protected', ensureAuthenticated, (req, res) => {
    res.send('This is a protected route');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

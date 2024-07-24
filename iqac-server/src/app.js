// // src/app.js
// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const morgan = require("morgan");
// const body_parser = require("body-parser")
// const dotenv = require('dotenv');
// const session = require('express-session');
// const passport = require('passport');
// const authRoutes = require('./routes/auth/auth');
// const cookieSession = require("cookie-session");
// const passportStrategy = require('./config/passport_config')

// //routes
// const regulation_frame_routes = require("./routes/regulation_frame/regulation_frame");
// const course_faculty_mapping_routes = require("./routes/course_faculty_mapping/course_faculty_mapping");

// //middleware logger config
// const morgan_config = morgan(
//     ":method :url :status :res[content-length] - :response-time ms"
// );

// dotenv.config();
// const app = express();
// const port = 5000;

// // Enable CORS AND LOGGER MIDDLEWARE

// app.use(
//     session({
//       secret: "my_screct_key_is_iqac",
//       resave: true,
//       saveUninitialized: true,
//     })
//   );
// app.use(
// 	cors({
// 		origin: "http://localhost:5173",
// 		methods: "GET,POST,PUT,DELETE",
// 		credentials: true,
// 	})
// );
// app.use(morgan_config);
// app.use(body_parser.json())
// app.use(express.json())
// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["cyberwolve"],
// 		maxAge: 24 * 60 * 60 * 100,
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/api/rf", regulation_frame_routes);
// app.use("/api/cfm", course_faculty_mapping_routes);
// app.use("/auth", authRoutes);

// // Start server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
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
        secret: 'my_screct_key_is_iqac',
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
    // Assuming you have some authentication logic here...
    const user = {
        id: 1,
        username: req.body.username,
        email: req.body.email,
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

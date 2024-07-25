const mysql = require("mysql2");


const db = mysql.createConnection({
    host: "localhost",
    user: "PragalyaK",
    password: "pragalya123",
    database: "iqac_ce",
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("MySQL connected");
});

module.exports = db;

// Import required modules
const path = require("path");
const express = require("express");

// Import route handlers
const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

// Initialize express application
const app = express();

// Set views directory and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serve static files and parse URL-encoded bodies
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Use route handlers
app.use("/", defaultRoutes);
app.use("/", restaurantRoutes);

// Error handling: 404 and internal server errors
app.use((req, res) => res.status(404).render("404"));
app.use((error, req, res, next) => res.status(500).render("500"));

// Start the server on port 3000
app.listen(3000);
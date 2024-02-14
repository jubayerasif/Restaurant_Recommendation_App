// Express module for web application development
const express = require("express");

// Instance of Express Router for defining routes
const router = express.Router();

// Route for the root path ('/') rendering the 'index' view
router.get("/", (req, res) => {
  res.render("index");
});

// Route for the '/about' path rendering the 'about' view
router.get("/about", (req, res) => {
  res.render("about");
});

// Export router instance for use in other modules
module.exports = router;
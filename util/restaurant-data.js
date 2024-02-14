// Core Node.js modules for file and directory paths, and file system operations
const path = require("path");
const fs = require("fs");

// File path for JSON data
const filePath = path.join(__dirname, "..", "data", "restaurants.json");

// Read stored restaurants from JSON file
function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath); // Read synchronously
  return JSON.parse(fileData); // Parse JSON and return
}

// Store restaurants data to JSON file
function storeRestaurants(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants)); // Write synchronously
}

// Export functions
module.exports = { getStoredRestaurants, storeRestaurants };
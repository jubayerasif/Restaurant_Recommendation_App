// Express module for routing
const express = require("express");

// UUID module for generating unique IDs
const uuid = require("uuid");

// Utility module for restaurant data
const resData = require("../util/restaurant-data");

// Create restaurant router
const router = express.Router();

// GET /restaurants route
router.get("/restaurants", (req, res) => {
  let order = req.query.order || "asc"; // Default order
  const nextOrder = order === "asc" ? "desc" : "asc"; // Next order toggle
  let storedRestaurants = resData.getStoredRestaurants(); // Fetch restaurants
  storedRestaurants.sort((resA, resB) => {
    // Sort restaurants
    const comparison = order === "asc" ? 1 : -1;
    return comparison * resA.name.localeCompare(resB.name);
  });
  // Render restaurants view with sorted restaurants and next order
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    nextOrder: nextOrder,
  });
});

// GET /restaurants/:id route
router.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id;
  const storedRestaurants = resData.getStoredRestaurants();
  const foundRestaurant = storedRestaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );
  if (foundRestaurant) {
    res.render("restaurant-detail", { restaurant: foundRestaurant });
  } else {
    res.status(404).render("404");
  }
});

// GET /recommend route
router.get("/recommend", (req, res) => {
  res.render("recommend"); // Render recommend view
});

// POST /recommend route
router.post("/recommend", (req, res) => {
  const newRestaurant = req.body;
  newRestaurant.id = uuid.v4(); // Generate unique ID
  let restaurants = resData.getStoredRestaurants(); // Fetch restaurants
  restaurants.push(newRestaurant); // Add new restaurant
  resData.storeRestaurants(restaurants); // Save updated data
  res.redirect("/confirm"); // Redirect to confirm view
});

// GET /confirm route
router.get("/confirm", (req, res) => {
  res.render("confirm"); // Render confirm view
});

// Export restaurant router
module.exports = router;
const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const uuid = require("uuid");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", async function (req, res) {
  try {
    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = await fs.readFile(filePath);
    const storedRestaurants = JSON.parse(fileData);
    res.render("restaurants", {
      numberOfRestaurants: storedRestaurants.length,
      restaurants: storedRestaurants,
    });
  } catch (error) {
    console.error("Error reading restaurant data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/restaurants/:id", async function (req, res) {
  try {
    const restaurantId = req.params.id;
    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = await fs.readFile(filePath);
    const storedRestaurants = JSON.parse(fileData);
    const restaurant = storedRestaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      res.render("restaurant-detail", { restaurant });
    } else {
      res.render("404");
    }
  } catch (error) {
    console.error("Error reading restaurant data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", async function (req, res) {
  try {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const filePath = path.join(__dirname, "data", "restaurants.json");
    const fileData = await fs.readFile(filePath);
    const storedRestaurants = JSON.parse(fileData);
    storedRestaurants.push(restaurant);
    await fs.writeFile(filePath, JSON.stringify(storedRestaurants));
    res.redirect("/confirm");
  } catch (error) {
    console.error("Error recommending restaurant:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.use(function (req, res) {
  res.render("404");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const path = require("path");
const app = express();
const router = express.Router();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Define routes
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/read", async (req, res) => {
  try {
    let users = await userModel.find();
    res.render("read", { users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      number,
      email,
      street,
      city,
      state,
      country,
      login,
      password,
    } = req.body;

    let existingEmailUser = await userModel.findOne({ email });
    if (existingEmailUser) {
      return res.status(400).send("User with this email already exists.");
    }

    let existingLoginUser = await userModel.findOne({ login });
    if (existingLoginUser) {
      return res.status(400).send("User with this login already exists.");
    }

    // Hashing the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      firstName,
      lastName,
      number,
      email,
      street,
      city,
      state,
      country,
      login,
      password,
    });

    res.redirect("/read");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Set up Netlify function handler
module.exports.handler = serverless(app);

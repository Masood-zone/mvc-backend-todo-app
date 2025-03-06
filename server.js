require("dotenv").config();
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const todoRoutes = require("./routes/todo");
const session = require("express-session");
const flash = require("connect-flash");
const errorHandler = require("./middleware/error.handler");
const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
// Routes
app.use("/", todoRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("partials/error", {
    message: "Page not found",
    error: { status: 404 },
  });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

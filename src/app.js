const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const userRouter = require("./routes/user.router");
const eventsRouter = require("./routes/events.routes");
const bookingRouter = require("./routes/booking.routes");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);
app.use("/api/user", userRouter);
app.use("/api/events", eventsRouter);
app.use("/api/booking", bookingRouter);

// Base route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to the Node Express Boilerplate API" });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;

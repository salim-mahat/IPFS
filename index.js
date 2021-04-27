const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");

require("dotenv").config();
const corsMiddleware = require("./utils/cors");
require("./database")();
const errorResponderMiddleware = require("./error/middleware");
const { NotAuthorized, RouteNotFound } = require("./error");

const app = express();
// app use
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  logger(":method :url :status :res[content-length] - :response-time ms")
);
app.use(corsMiddleware);

app.use("/", express.static(path.join("client", "build")));

app.use("/api", require("./routes"));
app.use((req, res, next) => {
  // If we got here no other route matched the path so we
  // hit a 404.
  if (process.env.NODE_ENV === "development") {
    next(new RouteNotFound());
    return;
  } else {
    next(new NotAuthorized());
    return;
  }
});
app.use(errorResponderMiddleware);

// Boot the application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is live at ${PORT}`);
});

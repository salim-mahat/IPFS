const cors = require("cors");

var whitelist = [
  "https://nftmarket-place.herokuapp.com",
  "http://localhost:5000",
  "http://localhost:3000",
  "http://localhost:3006",
];

var corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(new Error("Invalid Value for request origin"));

    const cleanedOrigin =
      origin[origin.length - 1] === "/"
        ? origin.substring(0, origin.length - 1)
        : origin;

    if (whitelist.includes(cleanedOrigin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
};

module.exports = cors(corsOptions);

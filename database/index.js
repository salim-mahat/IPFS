const mongoose = require("mongoose");
const db = require("../config/config").get(process.env.NODE_ENV);

// database connection
function init() {
  mongoose.Promise = global.Promise;
  mongoose.connect(
    db.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
      if (err) console.log(err);
      else console.log("database is connected");
    }
  );
}

module.exports = init;

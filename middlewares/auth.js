const User = require("./../models/user");
const { RecordNotFound, NotAuthorized } = require("../error");

let auth = (req, res, next) => {
  let token = req.headers["authorization"]?.split(" ")?.[1];
  if (!token) return next(new NotAuthorized("Invalid token"));

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return next(new RecordNotFound("User not found with given token"));

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };

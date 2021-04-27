var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config").get(process.env.NODE_ENV);
const salt = 10;

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  metamaskAccounts: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
});

// to signup a user
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//to login
userSchema.methods.comparepassword = function (password) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) reject(err);
      else resolve(isMatch);
    });
  });
};

// generate token

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign({ id: user._id }, config.SECRET, {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.getPlainDoc = function ({ password = false } = {}) {
  var user = this.toObject({ getters: true });

  if (password) {
    if (!user.password) {
      throw new Error("User instance does not have password field");
    }
    return user;
  }

  delete user.password;
  return user;
};

// find by token
userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, config.SECRET, function (err, decode) {
    user.findOne({ _id: decode.id }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

module.exports = mongoose.model("User", userSchema);

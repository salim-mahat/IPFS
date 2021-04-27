const config = {
  production: {
    SECRET: process.env.JWT_SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: "mysecretkey",
    DATABASE: "mongodb://localhost:27017/Proteum",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};

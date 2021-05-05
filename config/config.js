const config = {
  production: {
    SECRET: process.env.JWT_SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: "mysecretkey",
    DATABASE: "mongodb+srv://new:new123@cluster0-yikn7.mongodb.net/ipfs?retryWrites=true&w=majority",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};



// default: {
//   SECRET: "mysecretkey",
//   DATABASE: "mongodb://localhost:27017/Proteum",
// },
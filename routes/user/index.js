const router = require("express").Router();

const User = require("../../models/user");
const {
  RecordAlreadyExist,
  Validation,
  RecordNotFound,
} = require("../../error");

const currentUserAPI = require("./current");

const userFields = ["firstname", "lastname", "email", "password"];
router.post("/", function (req, res, next) {
  const userData = userFields.reduce((acc, field) => {
    acc[field] = req.body[field];
    return acc;
  }, {});

  const newuser = new User(userData);

  User.findOne({ email: newuser.email })
    .then((err, user) => {
      if (err) throw err;
      if (user) throw new RecordAlreadyExist("User already exists");
      return newuser.save();
    })
    .then((doc) => {
      if (!doc) throw new Error("Unable to process request");
      res.status(201).json({
        status: "success",
        user: doc.getPlainDoc(),
      });
    })
    .catch(next);
});

// login user
router.post("/login", function (req, res, next) {
  User.findOne({ email: req.body.email })
    .select("+password")
    .then((doc) => {
      if (!doc) throw new RecordNotFound("User not found");
      return [doc.comparepassword(req.body.password), doc];
    })
    .then(([match, doc]) => {
      if (!match) throw new Validation("Wrong password");
      const token = doc.generateToken();
      res.json({
        status: "success",
        user: doc.getPlainDoc(),
        token,
      });
    })
    .catch(next);
});

router.use("/current", currentUserAPI);

module.exports = router;

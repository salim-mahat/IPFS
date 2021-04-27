const express = require("express");
const { Validation } = require("../../../error");
const router = express.Router();

const { auth } = require("../../../middlewares/auth");
const User = require("../../../models/user");

router.use(auth);

// get logged in user
router.get("/", (req, res) => {
  res.json(req.user.getPlainDoc());
});

const validPatchFields = [
  "firstname",
  "lastname",
  "password",
  "metamaskAccounts",
];
router.patch("/", async (req, res, next) => {
  if (req.body.password && req.body.oldPassword) {
    req.user = await User.findById(req.user.id).select("+password");
    const isOldPasswordValid = await req.user.comparepassword(
      req.body.oldPassword
    );

    if (!isOldPasswordValid) {
      next(new Validation("Password did not match"));
      return;
    }
  }

  validPatchFields.forEach((val) => {
    if (req.body[val]) {
      req.user[val] = req.body[val];
    }
  });

  req.user
    .save()
    .then((user) => {
      if (!user) throw Error("Unable to update profile");
      res.json({
        status: "success",
        message: req.body.password ? "Password updated" : "Profile updated",
        user: req.user.getPlainDoc(),
      });
    })
    .catch(next);
});

module.exports = router;

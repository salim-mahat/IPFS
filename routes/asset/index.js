const express = require("express");
const router = express.Router();

const Asset = require("../../models/asset");
const { Validation, RecordNotFound } = require("../../error");
const { auth } = require("../../middlewares/auth");
const upload = require("../../utils/multer");
const assetIdAPI = require("./id");

router.use(auth);

const requiredFields = ["name", "description", "externalURL"];
const optionalFields = ["attributes"];
router.post("/", upload.single("file"), (req, res, next) => {
  if (!req.file) {
    next(new Validation("File not provided"));
    return;
  }

  const errorFields = [];
  let assetData = requiredFields.reduce((acc, val) => {
    if (req.body[val]) {
      acc[val] = req.body[val];
    } else {
      errorFields.push({ path: val, message: val + " is required" });
    }
    return acc;
  }, {});

  if (errorFields.length) {
    next(new Validation("Required fields are missing", errorFields));
    return;
  }

  assetData = optionalFields.reduce((acc, val) => {
    if (req.body[val]) {
      acc[val] = req.body[val];
    }
    return acc;
  }, assetData);

  assetData.UserId = req.user.id;
  assetData.assetLink = req.file.path;

  Asset.create(assetData)
    .then((doc) => {
      if (!doc) {
        next(new Error("Something went wrong"));
        return;
      }
      res.json({
        status: "success",
        message: "Mint created",
        mint: doc,
      });
    })
    .catch(next);
});

router.get("/", (req, res, next) => {
  const { limit = 10, skip = 0 } = req.query;
  Asset.find({ UserId: req.user.id })
    .limit(limit)
    .skip(skip)
    .then((doc) => {
      if (!doc) {
        next(new RecordNotFound("No records found"));
        return;
      }
      res.json(doc);
    })
    .catch(next);
});

router.use("/:assetId", assetIdAPI);

module.exports = router;

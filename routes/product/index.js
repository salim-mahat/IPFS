const express = require("express");
const { RecordNotFound } = require("../../error");
const router = express.Router();

const Asset = require("../../models/asset");

router.get("/", (req, res, next) => {
  Asset.find({
    status: "ONSALE",
  }).then((data) => {
    if (!data) {
      next(new RecordNotFound("Unable to fetch products"));
      return;
    }
    res.json(data);
  });
});

module.exports = router;

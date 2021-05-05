const express = require("express");
const router = express.Router({ mergeParams: true });

const Asset = require("../../../models/asset");
const { Validation, RecordNotFound } = require("../../../error");

router.use((req, res, next) => {
  Asset.findById(req.params.assetId)
    .then((doc) => {
      if (!doc) {
        next(new RecordNotFound("Asset not found"));
        return;
      }
      res.locals.asset = doc;
      next();
    })
    .catch(next);
});

router.get("/", (req, res, next) => {
  res.json(res.locals.asset);
});

const validPatchFields = [
  "name",
  "description",
  "fullDescription",
  "price",
  "status",
];
router.patch("/", (req, res, next) => {
  let assetData = validPatchFields.reduce((acc, val) => {
    if (req.body[val]) {
      acc[val] = req.body[val];
    }
    return acc;
  }, {});

  res.locals.asset
    .set({ ...assetData })
    .save()
    .then((doc) => {
      if (!doc) {
        next(new RecordNotFound("Unable to update asset"));
        return;
      }
      res.json({
        status: "success",
        message: "Asset moved on sale",
        asset: res.locals.asset,
      });
    })
    .catch(next);
});

module.exports = router;










const router = require("express").Router();

const userAPI = require("./user");
const assetAPI = require("./asset");
const productAPI = require("./product");

router.use("/user", userAPI);
router.use("/asset", assetAPI);
router.use("/product", productAPI);

module.exports = router;

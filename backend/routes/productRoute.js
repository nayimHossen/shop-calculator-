const express = require("express");
const { getProduct } = require("../controllers/productController");

const router = express.Router();

router.route("/product/:id").get(getProduct);

module.exports = router;

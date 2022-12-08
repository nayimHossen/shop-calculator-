const Product = require("../models/productModel");

//GET SERVICES
exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
};

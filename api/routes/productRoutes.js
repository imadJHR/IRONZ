const express = require("express");
const upload = require("../middleware/upload");
const {
  createProduct,
  getProductBySlug,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();

// Multer fields: image + gallery
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: 10 }
]);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/slug/:slug", getProductBySlug);

router.post("/", uploadFields, createProduct);
router.put("/:id", uploadFields, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
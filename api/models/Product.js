const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true },
    title: { type: String, trim: true },
    body: { type: String, trim: true },
    rating: { type: Number, min: 1, max: 5 },
    date: { type: Date },
    verified: { type: Boolean, default: false }
  },
  { _id: false }
);

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true, index: true },

    description: { type: String, default: "" },

    features: [{ type: String }],

    virtualReviews: [ReviewSchema],

    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, min: 0 },
    discount: { type: Number, min: 0 },

    image: ImageSchema,
    gallery: [ImageSchema],

    category: { type: String, default: "" },
    categoryId: { type: String, default: "" },

    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },

    isNew: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 0, min: 0 },

    tags: [{ type: String }],
    relatedProducts: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
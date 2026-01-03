const slugify = require("slugify");
const Product = require("../models/Product");

function makeSlug(input) {
  return slugify(String(input || ""), { lower: true, strict: true, trim: true });
}

function parseMaybeJSON(value, fallback) {
  if (value === undefined || value === null) return fallback;
  if (typeof value !== "string") return value;
  const v = value.trim();
  if (!v) return fallback;
  try {
    return JSON.parse(v);
  } catch {
    return value; // keep raw string if not JSON
  }
}

function parseArray(value) {
  const v = parseMaybeJSON(value, []);
  if (Array.isArray(v)) return v;
  if (typeof v === "string") return [v];
  return [];
}

function toNumber(value, fallback = undefined) {
  if (value === undefined || value === null || value === "") return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function toBool(value, fallback = undefined) {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value === "boolean") return value;
  const v = String(value).toLowerCase();
  if (["true", "1", "yes", "on"].includes(v)) return true;
  if (["false", "0", "no", "off"].includes(v)) return false;
  return fallback;
}

// Cloudinary upload helper (buffer -> upload_stream)
async function uploadBufferToCloudinary(cloudinary, buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });
}

async function deleteFromCloudinary(cloudinary, publicId) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (e) {
    // If deletion fails, we log but don't hard-fail the request
    console.error("Cloudinary destroy error:", e.message);
  }
}

exports.createProduct = async (req, res) => {
  const cloudinary = req.cloudinary;
  const folder = process.env.CLOUDINARY_FOLDER || "products";

  const {
    name,
    slug,
    description,
    category,
    categoryId
  } = req.body;

  const features = parseArray(req.body.features);
  const tags = parseArray(req.body.tags);
  const relatedProducts = parseArray(req.body.relatedProducts);
  const virtualReviews = parseMaybeJSON(req.body.virtualReviews, []);

  const price = toNumber(req.body.price);
  const oldPrice = toNumber(req.body.oldPrice);
  const discount = toNumber(req.body.discount);

  const rating = toNumber(req.body.rating, 0);
  const reviewCount = toNumber(req.body.reviewCount, 0);

  const isNew = toBool(req.body.isNew, false);
  const isFeatured = toBool(req.body.isFeatured, false);

  const inStock = toBool(req.body.inStock, true);
  const stockQuantity = toNumber(req.body.stockQuantity, 0);

  if (!name) return res.status(400).json({ message: "name is required" });
  if (price === undefined) return res.status(400).json({ message: "price is required" });

  const finalSlug = makeSlug(slug || name);
  if (!finalSlug) return res.status(400).json({ message: "slug is invalid" });

  const exists = await Product.findOne({ slug: finalSlug }).lean();
  if (exists) return res.status(409).json({ message: "slug already exists" });

  // files: image (single) + gallery (multiple)
  const imageFile = req.files?.image?.[0];
  const galleryFiles = req.files?.gallery || [];

  let mainImage = undefined;
  if (imageFile?.buffer) {
    const uploaded = await uploadBufferToCloudinary(cloudinary, imageFile.buffer, {
      folder,
      resource_type: "image"
    });
    mainImage = { url: uploaded.secure_url, publicId: uploaded.public_id };
  }

  const gallery = [];
  for (const f of galleryFiles) {
    if (!f?.buffer) continue;
    const uploaded = await uploadBufferToCloudinary(cloudinary, f.buffer, {
      folder,
      resource_type: "image"
    });
    gallery.push({ url: uploaded.secure_url, publicId: uploaded.public_id });
  }

  const product = await Product.create({
    name,
    slug: finalSlug,
    description: description || "",

    features,
    virtualReviews: Array.isArray(virtualReviews) ? virtualReviews : [],

    price,
    oldPrice,
    discount,

    image: mainImage,
    gallery,

    category: category || "",
    categoryId: categoryId || "",

    rating,
    reviewCount,

    isNew,
    isFeatured,

    inStock,
    stockQuantity,

    tags,
    relatedProducts
  });

  res.status(201).json(product);
};

exports.getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug }).lean();
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const cloudinary = req.cloudinary;
  const folder = process.env.CLOUDINARY_FOLDER || "products";

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // Basic fields (only update if provided)
  if (req.body.name !== undefined) product.name = req.body.name;

  if (req.body.slug !== undefined || req.body.name !== undefined) {
    const desiredSlug = makeSlug(req.body.slug || product.slug || product.name);
    if (!desiredSlug) return res.status(400).json({ message: "slug is invalid" });

    // unique check if slug changes
    if (desiredSlug !== product.slug) {
      const exists = await Product.findOne({ slug: desiredSlug }).lean();
      if (exists) return res.status(409).json({ message: "slug already exists" });
      product.slug = desiredSlug;
    }
  }

  if (req.body.description !== undefined) product.description = req.body.description;
  if (req.body.category !== undefined) product.category = req.body.category;
  if (req.body.categoryId !== undefined) product.categoryId = req.body.categoryId;

  if (req.body.features !== undefined) product.features = parseArray(req.body.features);
  if (req.body.tags !== undefined) product.tags = parseArray(req.body.tags);
  if (req.body.relatedProducts !== undefined) product.relatedProducts = parseArray(req.body.relatedProducts);

  if (req.body.virtualReviews !== undefined) {
    const vr = parseMaybeJSON(req.body.virtualReviews, []);
    product.virtualReviews = Array.isArray(vr) ? vr : product.virtualReviews;
  }

  const maybePrice = toNumber(req.body.price);
  if (maybePrice !== undefined) product.price = maybePrice;

  const maybeOldPrice = toNumber(req.body.oldPrice);
  if (maybeOldPrice !== undefined) product.oldPrice = maybeOldPrice;

  const maybeDiscount = toNumber(req.body.discount);
  if (maybeDiscount !== undefined) product.discount = maybeDiscount;

  const maybeRating = toNumber(req.body.rating);
  if (maybeRating !== undefined) product.rating = maybeRating;

  const maybeReviewCount = toNumber(req.body.reviewCount);
  if (maybeReviewCount !== undefined) product.reviewCount = maybeReviewCount;

  const maybeIsNew = toBool(req.body.isNew);
  if (maybeIsNew !== undefined) product.isNew = maybeIsNew;

  const maybeIsFeatured = toBool(req.body.isFeatured);
  if (maybeIsFeatured !== undefined) product.isFeatured = maybeIsFeatured;

  const maybeInStock = toBool(req.body.inStock);
  if (maybeInStock !== undefined) product.inStock = maybeInStock;

  const maybeStockQuantity = toNumber(req.body.stockQuantity);
  if (maybeStockQuantity !== undefined) product.stockQuantity = maybeStockQuantity;

  // Files handling
  const imageFile = req.files?.image?.[0];
  const galleryFiles = req.files?.gallery || [];

  // Replace main image if provided
  if (imageFile?.buffer) {
    if (product.image?.publicId) {
      await deleteFromCloudinary(cloudinary, product.image.publicId);
    }
    const uploaded = await uploadBufferToCloudinary(cloudinary, imageFile.buffer, {
      folder,
      resource_type: "image"
    });
    product.image = { url: uploaded.secure_url, publicId: uploaded.public_id };
  }

  // Gallery strategy:
  // - if replaceGallery=true => delete old + set new
  // - else => append new
  const replaceGallery = toBool(req.query.replaceGallery, false);

  if (galleryFiles.length > 0) {
    if (replaceGallery) {
      for (const img of product.gallery || []) {
        await deleteFromCloudinary(cloudinary, img.publicId);
      }
      product.gallery = [];
    }

    for (const f of galleryFiles) {
      const uploaded = await uploadBufferToCloudinary(cloudinary, f.buffer, {
        folder,
        resource_type: "image"
      });
      product.gallery.push({ url: uploaded.secure_url, publicId: uploaded.public_id });
    }
  }

  // Optional: remove some gallery images by publicId
  // pass galleryToRemove as JSON array or comma separated in form-data
  if (req.body.galleryToRemove !== undefined) {
    const toRemove = parseArray(req.body.galleryToRemove);
    if (toRemove.length > 0) {
      const remaining = [];
      for (const img of product.gallery || []) {
        if (toRemove.includes(img.publicId)) {
          await deleteFromCloudinary(cloudinary, img.publicId);
        } else {
          remaining.push(img);
        }
      }
      product.gallery = remaining;
    }
  }

  await product.save();
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const cloudinary = req.cloudinary;

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  if (product.image?.publicId) {
    await deleteFromCloudinary(cloudinary, product.image.publicId);
  }

  for (const img of product.gallery || []) {
    await deleteFromCloudinary(cloudinary, img.publicId);
  }

  await product.deleteOne();
  res.json({ message: "Product deleted" });
};
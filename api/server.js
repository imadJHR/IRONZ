require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const initCloudinary = require("./config/cloudinary");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Security & basics
app.use(helmet());
app.use(cors());

// For JSON (non-multipart)
app.use(express.json({ limit: "2mb" }));

// Init Cloudinary once, then inject into req
const cloudinary = initCloudinary();
app.use((req, res, next) => {
  req.cloudinary = cloudinary;
  next();
});

app.get("/", (req, res) => res.json({ ok: true, service: "products-backend" }));

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection error:", err.message);
    process.exit(1);
  });
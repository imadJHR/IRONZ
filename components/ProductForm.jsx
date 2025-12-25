"use client";

import { useState } from "react";

export default function ProductForm({ initialData = {}, onSubmit, submitText }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    slug: initialData.slug || "",
    description: initialData.description || "",
    features: initialData.features || [""],
    virtualReviews: initialData.virtualReviews || [],
    price: initialData.price || "",
    oldPrice: initialData.oldPrice || "",
    discount: initialData.discount || "",
    category: initialData.category || "",
    rating: initialData.rating || 0,
    reviewCount: initialData.reviewCount || 0,
    isNew: initialData.isNew || false,
    isFeatured: initialData.isFeatured || false,
    inStock: initialData.inStock || true,
    stockQuantity: initialData.stockQuantity || 0,
    tags: initialData.tags || [""],
  });

  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const updateField = (key, value) => {
    setFormData((p) => ({ ...p, [key]: value }));
  };

  const updateArray = (key, index, value) => {
    const arr = [...formData[key]];
    arr[index] = value;
    updateField(key, arr);
  };

  const addToArray = (key, emptyValue = "") => {
    updateField(key, [...formData[key], emptyValue]);
  };

  const removeFromArray = (key, index) => {
    updateField(
      key,
      formData[key].filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();

    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        body.append(key, JSON.stringify(formData[key])); 
      } else {
        body.append(key, formData[key]);
      }
    });

    if (image) body.append("image", image);
    if (gallery.length > 0) {
      gallery.forEach((img) => body.append("gallery", img));
    }

    onSubmit(body);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">

      {/* NAME */}
      <div>
        <label className="font-semibold block">Name</label>
        <input
          className="border p-2 w-full"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </div>

      {/* SLUG */}
      <div>
        <label className="font-semibold block">Slug</label>
        <input
          className="border p-2 w-full"
          value={formData.slug}
          onChange={(e) => updateField("slug", e.target.value)}
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="font-semibold block">Description</label>
        <textarea
          className="border p-2 w-full"
          rows={4}
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </div>

      {/* FEATURES */}
      <div>
        <label className="font-semibold block">Features</label>
        {formData.features.map((f, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="border p-2 w-full"
              value={f}
              onChange={(e) => updateArray("features", i, e.target.value)}
            />
            <button
              type="button"
              className="bg-red-600 text-white px-2"
              onClick={() => removeFromArray("features", i)}
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-gray-700 text-white px-4 py-1 rounded"
          onClick={() => addToArray("features")}
        >
          Add Feature
        </button>
      </div>

      {/* TAGS */}
      <div>
        <label className="font-semibold block">Tags</label>
        {formData.tags.map((t, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="border p-2 w-full"
              value={t}
              onChange={(e) => updateArray("tags", i, e.target.value)}
            />
            <button
              type="button"
              className="bg-red-600 text-white px-2"
              onClick={() => removeFromArray("tags", i)}
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-gray-700 text-white px-4 py-1 rounded"
          onClick={() => addToArray("tags")}
        >
          Add Tag
        </button>
      </div>

      {/* PRICING */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="font-semibold block">Price</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={formData.price}
            onChange={(e) => updateField("price", e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold block">Old Price</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={formData.oldPrice}
            onChange={(e) => updateField("oldPrice", e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold block">Discount (%)</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={formData.discount}
            onChange={(e) => updateField("discount", e.target.value)}
          />
        </div>
      </div>

      {/* STOCK */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="font-semibold block">Stock Quantity</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={formData.stockQuantity}
            onChange={(e) => updateField("stockQuantity", e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold block">In Stock</label>
          <select
            className="border p-2 w-full"
            value={formData.inStock}
            onChange={(e) => updateField("inStock", e.target.value === "true")}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block">Category</label>
          <input
            className="border p-2 w-full"
            value={formData.category}
            onChange={(e) => updateField("category", e.target.value)}
          />
        </div>
      </div>

      {/* FLAGS */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isNew}
            onChange={(e) => updateField("isNew", e.target.checked)}
          />
          Is New?
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => updateField("isFeatured", e.target.checked)}
          />
          Featured?
        </label>
      </div>

      {/* IMAGE */}
      <div>
        <label className="font-semibold block">Main Image</label>
        <input
          type="file"
          className="border p-2 w-full"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      {/* GALLERY */}
      <div>
        <label className="font-semibold block">Gallery Images</label>
        <input
          type="file"
          multiple
          className="border p-2 w-full"
          onChange={(e) => setGallery([...e.target.files])}
        />
      </div>

      {/* SUBMIT */}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {submitText}
      </button>
    </form>
  );
}

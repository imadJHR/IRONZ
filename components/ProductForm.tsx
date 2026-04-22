"use client";

import { useState, ChangeEvent, FormEvent } from "react";

// Types
export interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  features: string[];
  virtualReviews: Array<{
    id?: string;
    author: string;
    rating: number;
    comment: string;
    date?: string;
    verified?: boolean;
  }>;
  price: string | number;
  oldPrice: string | number;
  discount: string | number;
  category: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockQuantity: number | string;
  tags: string[];
  [key: string]: unknown;
}

export interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (formData: FormData) => void | Promise<void>;
  submitText?: string;
  className?: string;
  disabled?: boolean;
}

// Separate interface that uses string types for form inputs
interface FormState {
  name: string;
  slug: string;
  description: string;
  features: string[];
  virtualReviews: Array<{
    id?: string;
    author: string;
    rating: number;
    comment: string;
    date?: string;
    verified?: boolean;
  }>;
  price: string;
  oldPrice: string;
  discount: string;
  category: string;
  rating: string;
  reviewCount: string;
  isNew: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockQuantity: string;
  tags: string[];
}

export default function ProductForm({ 
  initialData = {}, 
  onSubmit, 
  submitText = "Submit",
  className = "",
  disabled = false
}: ProductFormProps) {
  const [formData, setFormData] = useState<FormState>({
    name: initialData.name?.toString() || "",
    slug: initialData.slug?.toString() || "",
    description: initialData.description?.toString() || "",
    features: Array.isArray(initialData.features) 
      ? initialData.features.map(f => f?.toString() || "") 
      : [""],
    virtualReviews: Array.isArray(initialData.virtualReviews) 
      ? initialData.virtualReviews 
      : [],
    price: initialData.price?.toString() || "",
    oldPrice: initialData.oldPrice?.toString() || "",
    discount: initialData.discount?.toString() || "",
    category: initialData.category?.toString() || "",
    rating: initialData.rating?.toString() || "0",
    reviewCount: initialData.reviewCount?.toString() || "0",
    isNew: Boolean(initialData.isNew),
    isFeatured: Boolean(initialData.isFeatured),
    inStock: initialData.inStock !== false,
    stockQuantity: initialData.stockQuantity?.toString() || "0",
    tags: Array.isArray(initialData.tags) 
      ? initialData.tags.map(t => t?.toString() || "") 
      : [""],
  });

  const [image, setImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateArrayField = (
    key: "features" | "tags", 
    index: number, 
    value: string
  ): void => {
    setFormData((prev) => {
      const arr = [...prev[key]];
      arr[index] = value;
      return { ...prev, [key]: arr };
    });
  };

  const addToArrayField = (
    key: "features" | "tags", 
    emptyValue: string = ""
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [key]: [...prev[key], emptyValue],
    }));
  };

  const removeFromArrayField = (
    key: "features" | "tags", 
    index: number
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setGallery(Array.from(files));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (disabled || isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const body = new FormData();

      // Convert FormState back to proper types for submission
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          body.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          body.append(key, String(value));
        }
      });

      if (image) body.append("image", image);
      
      if (gallery.length > 0) {
        gallery.forEach((img) => body.append("gallery", img));
      }

      await onSubmit(body);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNumberChange = (
    e: ChangeEvent<HTMLInputElement>, 
    field: "price" | "oldPrice" | "discount" | "stockQuantity" | "rating" | "reviewCount"
  ): void => {
    const value = e.target.value;
    // Allow empty string or valid number
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      updateField(field, value);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`space-y-6 max-w-3xl ${className}`}
      noValidate
    >
      {/* NAME */}
      <div>
        <label htmlFor="name" className="font-semibold block mb-1">Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("name", e.target.value)}
          disabled={disabled || isSubmitting}
          placeholder="Enter product name"
        />
      </div>

      {/* SLUG */}
      <div>
        <label htmlFor="slug" className="font-semibold block mb-1">Slug *</label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.slug}
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
          disabled={disabled || isSubmitting}
          placeholder="product-name-here"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          URL-friendly identifier (lowercase, hyphens only)
        </p>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label htmlFor="description" className="font-semibold block mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          value={formData.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateField("description", e.target.value)}
          disabled={disabled || isSubmitting}
          placeholder="Enter product description"
        />
      </div>

      {/* FEATURES */}
      <div>
        <label className="font-semibold block mb-2">Features</label>
        {formData.features.map((feature: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={feature}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateArrayField("features", index, e.target.value)}
              disabled={disabled || isSubmitting}
              placeholder={`Feature ${index + 1}`}
            />
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => removeFromArrayField("features", index)}
              disabled={disabled || isSubmitting || formData.features.length <= 1}
              aria-label={`Remove feature ${index + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => addToArrayField("features")}
          disabled={disabled || isSubmitting}
        >
          + Add Feature
        </button>
      </div>

      {/* TAGS */}
      <div>
        <label className="font-semibold block mb-2">Tags</label>
        {formData.tags.map((tag: string, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={tag}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateArrayField("tags", index, e.target.value)}
              disabled={disabled || isSubmitting}
              placeholder={`Tag ${index + 1}`}
            />
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => removeFromArrayField("tags", index)}
              disabled={disabled || isSubmitting || formData.tags.length <= 1}
              aria-label={`Remove tag ${index + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => addToArrayField("tags")}
          disabled={disabled || isSubmitting}
        >
          + Add Tag
        </button>
      </div>

      {/* PRICING */}
      <fieldset className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <legend className="font-semibold px-2">Pricing</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          <div>
            <label htmlFor="price" className="font-semibold block mb-1">Price (€) *</label>
            <input
              id="price"
              name="price"
              type="text"
              inputMode="decimal"
              required
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.price}
              onChange={(e) => handleNumberChange(e, "price")}
              disabled={disabled || isSubmitting}
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="oldPrice" className="font-semibold block mb-1">Old Price (€)</label>
            <input
              id="oldPrice"
              name="oldPrice"
              type="text"
              inputMode="decimal"
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.oldPrice}
              onChange={(e) => handleNumberChange(e, "oldPrice")}
              disabled={disabled || isSubmitting}
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="discount" className="font-semibold block mb-1">Discount (%)</label>
            <input
              id="discount"
              name="discount"
              type="text"
              inputMode="numeric"
              min="0"
              max="100"
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.discount}
              onChange={(e) => handleNumberChange(e, "discount")}
              disabled={disabled || isSubmitting}
              placeholder="0"
            />
          </div>
        </div>
      </fieldset>

      {/* STOCK & CATEGORY */}
      <fieldset className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <legend className="font-semibold px-2">Inventory</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
          <div>
            <label htmlFor="stockQuantity" className="font-semibold block mb-1">Stock Quantity</label>
            <input
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              min="0"
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.stockQuantity}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("stockQuantity", e.target.value)}
              disabled={disabled || isSubmitting}
              placeholder="0"
            />
          </div>

          <div>
            <label htmlFor="inStock" className="font-semibold block mb-1">Availability</label>
            <select
              id="inStock"
              name="inStock"
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.inStock ? "true" : "false"}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => updateField("inStock", e.target.value === "true")}
              disabled={disabled || isSubmitting}
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" className="font-semibold block mb-1">Category *</label>
            <input
              id="category"
              name="category"
              type="text"
              required
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.category}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("category", e.target.value)}
              disabled={disabled || isSubmitting}
              placeholder="e.g., Fitness, Supplements"
            />
          </div>
        </div>
      </fieldset>

      {/* FLAGS */}
      <fieldset className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <legend className="font-semibold px-2">Product Flags</legend>
        <div className="flex flex-wrap gap-6 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={formData.isNew}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("isNew", e.target.checked)}
              disabled={disabled || isSubmitting}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Is New?</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={formData.isFeatured}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateField("isFeatured", e.target.checked)}
              disabled={disabled || isSubmitting}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured?</span>
          </label>
        </div>
      </fieldset>

      {/* IMAGE UPLOAD */}
      <fieldset className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <legend className="font-semibold px-2">Images</legend>
        <div className="space-y-4 mt-2">
          <div>
            <label htmlFor="mainImage" className="font-semibold block mb-1">Main Image *</label>
            <input
              id="mainImage"
              name="mainImage"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                dark:file:bg-blue-900/30 dark:file:text-blue-300
                hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50
                disabled:opacity-50 disabled:cursor-not-allowed"
              onChange={handleImageChange}
              disabled={disabled || isSubmitting}
            />
            {image && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Selected: {image.name} ({(image.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          <div>
            <label htmlFor="gallery" className="font-semibold block mb-1">Gallery Images</label>
            <input
              id="gallery"
              name="gallery"
              type="file"
              multiple
              accept="image/*"
              className="block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                dark:file:bg-blue-900/30 dark:file:text-blue-300
                hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50
                disabled:opacity-50 disabled:cursor-not-allowed"
              onChange={handleGalleryChange}
              disabled={disabled || isSubmitting}
            />
            {gallery.length > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {gallery.length} file{gallery.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* SUBMIT */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center gap-2"
          disabled={disabled || isSubmitting}
        >
          {isSubmitting && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {isSubmitting ? "Submitting..." : submitText}
        </button>
      </div>
    </form>
  );
}
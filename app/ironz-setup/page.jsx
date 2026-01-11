'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Package,
  Dumbbell,
  Pill,
  Shirt,
  Save,
  Loader2,
  Image as ImageIcon,
  X,
  Plus,
  Tag,
  Upload,
  Layers,
  Scale,
  Truck,
  Shield,
  Palette,
  Ruler,
  Star,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Percent,
  Hash,
  Calendar,
  Package2,
  FileText,
  Grid3x3,
  CheckCircle,
  AlertCircle,
  Trash2,
  Zap,
  List // AJOUTÉ : Pour le bouton de gestion
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api';

const categories = [
  {
    id: 'equipements',
    label: 'Équipements',
    dbValue: 'Equipements',
    description: 'Gym equipment & weights',
    icon: Dumbbell,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'supplement',
    label: 'Supplément',
    dbValue: 'Supplément',
    description: 'Proteins & supplements',
    icon: Pill,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'accessoires',
    label: 'Accessoires',
    dbValue: 'Accessoires',
    description: 'Clothing & accessories',
    icon: Shirt,
    color: 'from-purple-500 to-pink-500',
  },
];

const initialFormData = {
  name: '',
  description: '',
  price: '',
  oldPrice: '',
  discount: '',
  category: 'Equipements',
  subCategory: '',
  rating: '',
  reviewCount: '',
  isNewProduct: false,
  isFeatured: false,
  inStock: true,
  stockQuantity: '',
  sku: '',
  warranty: '',
  width: '',
  height: '',
  depth: '',
  weight: '',
  shippingDimensions: '',
  shippingWeight: '',
  shippingMethod: '',
  estimatedDelivery: '',
};

export default function AddProductPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('equipements');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calcul auto du discount
  const [autoDiscount, setAutoDiscount] = useState(false);

  // Images
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Arrays
  const [features, setFeatures] = useState([]);
  const [tags, setTags] = useState([]);
  const [colors, setColors] = useState([]);
  const [taille, setTaille] = useState([]);
  const [materials, setMaterials] = useState([]);

  // Array inputs
  const [newFeature, setNewFeature] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newTaille, setNewTaille] = useState('');
  const [newMaterial, setNewMaterial] = useState('');

  // Form data
  const [formData, setFormData] = useState(initialFormData);

  // Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Refs
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Toast notification
  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Auto-calc discount from price & oldPrice
  useEffect(() => {
    if (!autoDiscount) return;

    const price = parseFloat(formData.price);
    const oldPrice = parseFloat(formData.oldPrice);

    if (
      isNaN(price) ||
      isNaN(oldPrice) ||
      oldPrice <= 0 ||
      price <= 0 ||
      price >= oldPrice
    ) {
      if (formData.discount !== '') {
        setFormData((prev) => ({ ...prev, discount: '' }));
      }
      return;
    }

    const newDiscount = Math.round(((oldPrice - price) / oldPrice) * 100);
    const newDiscountStr = String(newDiscount);

    if (newDiscountStr !== formData.discount) {
      setFormData((prev) => ({ ...prev, discount: newDiscountStr }));
    }
  }, [autoDiscount, formData.price, formData.oldPrice, formData.discount]);

  // Handle main image upload
  const handleMainImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotification('File size exceeds 5MB', 'error');
      return;
    }

    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
    showNotification('Main image uploaded successfully');
  };

  // Handle gallery upload
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);

    if (validFiles.length < files.length) {
      showNotification('Some files exceed 5MB limit', 'warning');
    }

    const newGallery = [...galleryImages, ...validFiles].slice(0, 10);
    setGalleryImages(newGallery);

    const newPreviews = newGallery.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(newPreviews);

    showNotification(`${validFiles.length} image(s) added to gallery`);
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    const newGallery = galleryImages.filter((_, i) => i !== index);
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    setGalleryImages(newGallery);
    setGalleryPreviews(newPreviews);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Add array item
  const handleAddItem = (array, setArray, newItem, setNewItem, typeLabel) => {
    const value = newItem.trim();
    if (!value) return;

    if (array.includes(value)) {
      showNotification(`${value} already exists`, 'warning');
      return;
    }

    setArray([...array, value]);
    setNewItem('');
    showNotification(`${value} added to ${typeLabel}`);
  };

  // Remove array item
  const handleRemoveItem = (array, setArray, index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  // Handle key press for arrays
  const handleKeyPress = (e, array, setArray, newItem, setNewItem, typeLabel) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(array, setArray, newItem, setNewItem, typeLabel);
    }
  };

  // Calculate final price
  const calculateFinalPrice = () => {
    const price = parseFloat(formData.price) || 0;
    const discount = parseFloat(formData.discount) || 0;

    if (discount > 0 && formData.oldPrice) {
      const oldPrice = parseFloat(formData.oldPrice);
      return oldPrice - (oldPrice * discount) / 100;
    }
    return price;
  };

  // Format currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      showNotification('Product name is required', 'error');
      return false;
    }
    if (!formData.description.trim()) {
      showNotification('Product description is required', 'error');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      showNotification('Valid price is required', 'error');
      return false;
    }
    if (!mainImage) {
      showNotification('Main product image is required', 'error');
      return false;
    }
    return true;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Basic fields
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);

      // Optional fields
      if (formData.oldPrice) formDataToSend.append('oldPrice', formData.oldPrice);
      if (formData.discount) formDataToSend.append('discount', formData.discount);
      if (formData.subCategory) formDataToSend.append('subCategory', formData.subCategory.trim());
      if (formData.rating) formDataToSend.append('rating', formData.rating);
      if (formData.reviewCount) formDataToSend.append('reviewCount', formData.reviewCount);
      if (formData.stockQuantity) formDataToSend.append('stockQuantity', formData.stockQuantity);
      if (formData.sku) formDataToSend.append('sku', formData.sku.trim());
      if (formData.warranty) formDataToSend.append('warranty', formData.warranty.trim());

      // Boolean fields
      formDataToSend.append('isNewProduct', formData.isNewProduct.toString());
      formDataToSend.append('isFeatured', formData.isFeatured.toString());
      formDataToSend.append('inStock', formData.inStock.toString());

      // Arrays as JSON
      formDataToSend.append('features', JSON.stringify(features));
      formDataToSend.append('tags', JSON.stringify(tags));
      formDataToSend.append('colors', JSON.stringify(colors));
      formDataToSend.append('taille', JSON.stringify(taille));
      formDataToSend.append('materials', JSON.stringify(materials));

      // Dimensions object
      const dimensions = {
        width: parseFloat(formData.width) || 0,
        height: parseFloat(formData.height) || 0,
        depth: parseFloat(formData.depth) || 0,
        weight: parseFloat(formData.weight) || 0,
      };
      formDataToSend.append('dimensions', JSON.stringify(dimensions));

      // Shipping object
      const shipping = {
        dimensions: formData.shippingDimensions || '',
        weight: parseFloat(formData.shippingWeight) || 0,
        method: formData.shippingMethod || '',
        estimatedDelivery: formData.estimatedDelivery || '',
      };
      formDataToSend.append('shipping', JSON.stringify(shipping));

      // Images
      if (mainImage) {
        formDataToSend.append('image', mainImage);
      }

      galleryImages.forEach((file) => {
        formDataToSend.append('gallery', file);
      });

      // Send to API
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add product');
      }

      showNotification('Product added successfully! Redirecting...');

      // Reset form
      setFormData(initialFormData);
      setMainImage(null);
      setMainImagePreview('');
      setGalleryImages([]);
      setGalleryPreviews([]);
      setFeatures([]);
      setTags([]);
      setColors([]);
      setTaille([]);
      setMaterials([]);
      setAutoDiscount(false);

      // Redirect vers la page de liste des produits
      setTimeout(() => {
        router.push('/ironz-setup/products');
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Failed to add product', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find((c) => c.id === activeTab);
  const completion = formData.name && formData.description && formData.price ? '80%' : '40%';

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-4 md:p-8">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-slideInRight">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm ${
              toast.type === 'success'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                : toast.type === 'error'
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
                : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast({ show: false, message: '', type: 'success' })}
              className="ml-4 opacity-80 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          
          {/* Top Navigation Bar with Back and Manage Button */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 text-yellow-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Retour</span>
            </button>

            {/* ---> BOUTON GÉRER LE STOCK AJOUTÉ ICI <--- */}
            <button
              onClick={() => router.push('/ironz-setup/products')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border-2 border-yellow-400 text-yellow-700 font-bold hover:bg-yellow-50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <List className="w-5 h-5" />
              <span>Gérer le stock</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 shadow-lg">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                    Add New Product
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Create amazing products for your store
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-200 shadow-lg">
                <div className="p-2 rounded-lg bg-yellow-100">
                  {selectedCategory && <selectedCategory.icon className="w-5 h-5 text-yellow-600" />}
                </div>
                <div>
                  <div className="text-sm text-gray-600">Current Category</div>
                  <div className="font-bold text-gray-900">{selectedCategory?.label}</div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Publish Product</span>
                      <Zap className="w-4 h-4 ml-1" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-200 shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Product Category</h2>
                  <p className="text-sm text-gray-600">Choose the right category</p>
                </div>
              </div>

              <div className="space-y-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeTab === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveTab(category.id);
                        setFormData((prev) => ({ ...prev, category: category.dbValue }));
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                        isActive
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : 'bg-white border border-gray-200 hover:border-yellow-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            isActive ? 'bg-white/20' : 'bg-gradient-to-br ' + category.color
                          }`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                            {category.label}
                          </div>
                          <div className={`text-sm mt-1 ${isActive ? 'text-white/90' : 'text-gray-600'}`}>
                            {category.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="p-1 rounded-full bg-white/20">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-200 shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package2 className="w-5 h-5 text-yellow-500" />
                Quick Overview
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
                      <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">Main Image</span>
                  </div>
                  <span className={`font-bold ${mainImage ? 'text-green-600' : 'text-red-500'}`}>
                    {mainImage ? '✓ Uploaded' : 'Required'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                      <Grid3x3 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">Gallery Images</span>
                  </div>
                  <span className="font-bold text-gray-900">{galleryImages.length}/10</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">Features</span>
                  </div>
                  <span className="font-bold text-gray-900">{features.length} added</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">Completion</span>
                  </div>
                  <span
                    className={`font-bold ${
                      completion === '80%' ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    {completion}
                  </span>
                </div>
              </div>

              {/* Price Preview */}
              {formData.price && (
                <div className="mt-6 pt-6 border-t border-yellow-200">
                  <div className="text-sm text-gray-600 mb-2">Price Preview</div>
                  <div className="flex items-end gap-2">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(calculateFinalPrice())}
                    </div>
                    {formData.discount && parseFloat(formData.discount) > 0 && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatCurrency(parseFloat(formData.oldPrice || formData.price))}
                      </div>
                    )}
                  </div>
                  {formData.discount && parseFloat(formData.discount) > 0 && (
                    <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-red-100 to-rose-100">
                      <TrendingUp className="w-3 h-3 text-red-500" />
                      <span className="text-sm font-bold text-red-600">{formData.discount}% OFF</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-200 shadow-lg overflow-hidden">
              {/* Form Header */}
              <div className="p-6 border-b border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                    <p className="text-gray-600 mt-1">
                      Fill in the details for your product
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500">
                    <span className="text-sm font-bold text-white">STEP 2</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Product Images */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-yellow-500" />
                      Product Images
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Main Image */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
                            <ImageIcon className="w-4 h-4 text-white" />
                          </div>
                          <span>Main Image</span>
                          <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="relative border-3 border-dashed border-yellow-300 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-yellow-500 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-amber-50 group"
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageUpload}
                            className="hidden"
                          />
                          {mainImagePreview ? (
                            <div className="space-y-4">
                              <div className="relative mx-auto w-32 h-32 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                                <img
                                  src={mainImagePreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="space-y-2">
                                <p className="font-medium text-gray-900 truncate">{mainImage?.name}</p>
                                <p className="text-sm text-gray-500">
                                  {(mainImage?.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMainImage(null);
                                  setMainImagePreview('');
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium hover:shadow-lg transition-all duration-300"
                              >
                                <Trash2 className="w-4 h-4" />
                                Remove
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Upload className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">Click to upload</p>
                                <p className="text-sm text-gray-500 mt-2">PNG, JPG, WebP up to 5MB</p>
                              </div>
                              <button
                                type="button"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium hover:shadow-md transition-all duration-300"
                              >
                                Browse Files
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Gallery Images */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                            <Grid3x3 className="w-4 h-4 text-white" />
                          </div>
                          Gallery Images
                        </label>
                        <div
                          onClick={() => galleryInputRef.current?.click()}
                          className="relative border-3 border-dashed border-blue-300 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 group"
                        >
                          <input
                            ref={galleryInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleGalleryUpload}
                            className="hidden"
                          />
                          <div className="space-y-4">
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <ImageIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">Drag & drop images</p>
                              <p className="text-sm text-gray-500 mt-2">Up to 10 images, 5MB each</p>
                            </div>
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 font-medium hover:shadow-md transition-all duration-300"
                            >
                              <Upload className="w-4 h-4" />
                              Select Images
                            </button>
                          </div>
                        </div>

                        {/* Gallery Preview */}
                        {galleryPreviews.length > 0 && (
                          <div className="mt-6">
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-medium text-gray-900">Selected Images:</span>
                              <span className="text-sm font-bold text-blue-600">
                                {galleryImages.length}/10
                              </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {galleryPreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                  <div className="aspect-square rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                                    <img
                                      src={preview}
                                      alt={`Gallery ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-yellow-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm font-medium text-yellow-600">
                        BASIC INFORMATION
                      </span>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label
                          htmlFor="name"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <ShoppingBag className="w-4 h-4 text-yellow-500" />
                          <span>Product Name</span>
                          <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g., Disque de Poids 20kg – TopGym"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="sku" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <Hash className="w-4 h-4 text-purple-500" />
                          SKU (Optional)
                        </label>
                        <input
                          id="sku"
                          name="sku"
                          value={formData.sku}
                          onChange={handleInputChange}
                          placeholder="e.g., TY-PR-002"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="description"
                        className="flex items-center gap-2 text-sm font-bold text-gray-900"
                      >
                        <FileText className="w-4 h-4 text-green-500" />
                        <span>Description</span>
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter detailed product description..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <Layers className="w-4 h-4 text-blue-500" />
                        Features
                      </label>
                      <div className="flex gap-2">
                        <input
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyPress={(e) =>
                            handleKeyPress(e, features, setFeatures, newFeature, setNewFeature, 'features')
                          }
                          placeholder="Add a product feature..."
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleAddItem(features, setFeatures, newFeature, setNewFeature, 'features')
                          }
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:shadow-lg transition-all duration-300"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      {features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {features.map((feature, index) => (
                            <div
                              key={index}
                              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200"
                            >
                              <Tag className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium text-gray-900">{feature}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(features, setFeatures, index)}
                                className="ml-1 p-1 rounded-full hover:bg-red-100 transition-colors"
                              >
                                <X className="w-3 h-3 text-red-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-yellow-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm font-medium text-yellow-600">
                        PRICING & STOCK
                      </span>
                    </div>
                  </div>

                  {/* Pricing & Stock */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <label
                          htmlFor="price"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span>Price</span>
                          <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                            required
                          />
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                            MAD
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label
                          htmlFor="oldPrice"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <TrendingUp className="w-4 h-4 text-red-500" />
                          Old Price
                        </label>
                        <div className="relative">
                          <input
                            id="oldPrice"
                            name="oldPrice"
                            type="number"
                            value={formData.oldPrice}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                          />
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                            MAD
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="discount"
                            className="flex items-center gap-2 text-sm font-bold text-gray-900"
                          >
                            <Percent className="w-4 h-4 text-orange-500" />
                            Discount %
                          </label>
                          <label className="flex items-center gap-1 text-[11px] text-gray-500 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={autoDiscount}
                              onChange={(e) => setAutoDiscount(e.target.checked)}
                              className="h-3 w-3 rounded border-gray-300 text-yellow-500 focus:ring-yellow-400"
                            />
                            <span>Auto</span>
                          </label>
                        </div>
                        <input
                          id="discount"
                          name="discount"
                          type="number"
                          value={formData.discount}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="0"
                          max="100"
                          disabled={autoDiscount}
                          className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300 ${
                            autoDiscount ? 'bg-gray-100 cursor-not-allowed' : ''
                          }`}
                        />
                        {autoDiscount && (
                          <p className="text-[11px] text-gray-500">
                            Calculated automatically from Price & Old Price.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label
                          htmlFor="stockQuantity"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <Package2 className="w-4 h-4 text-purple-500" />
                          Stock Quantity
                        </label>
                        <input
                          id="stockQuantity"
                          name="stockQuantity"
                          type="number"
                          value={formData.stockQuantity}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="0"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-3">
                        <label
                          htmlFor="subCategory"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <Layers className="w-4 h-4 text-cyan-500" />
                          Sub-category
                        </label>
                        <input
                          id="subCategory"
                          name="subCategory"
                          value={formData.subCategory}
                          onChange={handleInputChange}
                          placeholder="e.g., Disque, Protein, Shorts"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="flex flex-wrap gap-6 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="isNewProduct"
                            checked={formData.isNewProduct}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-12 h-6 rounded-full transition-all duration-300 ${
                              formData.isNewProduct
                                ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                                : 'bg-gray-300'
                            }`}
                          ></div>
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                              formData.isNewProduct ? 'transform translate-x-6' : ''
                            }`}
                          ></div>
                        </div>
                        <span className="font-medium text-gray-900">New Product</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-12 h-6 rounded-full transition-all duration-300 ${
                              formData.isFeatured
                                ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                                : 'bg-gray-300'
                            }`}
                          ></div>
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                              formData.isFeatured ? 'transform translate-x-6' : ''
                            }`}
                          ></div>
                        </div>
                        <span className="font-medium text-gray-900">Featured</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-12 h-6 rounded-full transition-all duration-300 ${
                              formData.inStock
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                : 'bg-gray-300'
                            }`}
                          ></div>
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                              formData.inStock ? 'transform translate-x-6' : ''
                            }`}
                          ></div>
                        </div>
                        <span className="font-medium text-gray-900">In Stock</span>
                      </label>
                    </div>
                  </div>

                  {/* Equipment Specifications */}
                  {activeTab === 'equipements' && (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-yellow-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-white text-sm font-medium text-yellow-600">
                            EQUIPMENT SPECIFICATIONS
                          </span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-3">
                            <label htmlFor="width" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                              <Ruler className="w-4 h-4 text-blue-500" />
                              Width (cm)
                            </label>
                            <input
                              id="width"
                              name="width"
                              type="number"
                              value={formData.width}
                              onChange={handleInputChange}
                              placeholder="0"
                              min="0"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                            />
                          </div>

                          <div className="space-y-3">
                            <label
                              htmlFor="height"
                              className="flex items-center gap-2 text-sm font-bold text-gray-900"
                            >
                              <Ruler className="w-4 h-4 text-blue-500" />
                              Height (cm)
                            </label>
                            <input
                              id="height"
                              name="height"
                              type="number"
                              value={formData.height}
                              onChange={handleInputChange}
                              placeholder="0"
                              min="0"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                            />
                          </div>

                          <div className="space-y-3">
                            <label htmlFor="depth" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                              <Ruler className="w-4 h-4 text-blue-500" />
                              Depth (cm)
                            </label>
                            <input
                              id="depth"
                              name="depth"
                              type="number"
                              value={formData.depth}
                              onChange={handleInputChange}
                              placeholder="0"
                              min="0"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                            />
                          </div>

                          <div className="space-y-3">
                            <label htmlFor="weight" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                              <Scale className="w-4 h-4 text-blue-500" />
                              Weight (kg)
                            </label>
                            <input
                              id="weight"
                              name="weight"
                              type="number"
                              value={formData.weight}
                              onChange={handleInputChange}
                              placeholder="0"
                              min="0"
                              step="0.1"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                            />
                          </div>
                        </div>

                        {/* Materials */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                            <Layers className="w-4 h-4 text-purple-500" />
                            Materials
                          </label>
                          <div className="flex gap-2">
                            <input
                              value={newMaterial}
                              onChange={(e) => setNewMaterial(e.target.value)}
                              onKeyPress={(e) =>
                                handleKeyPress(
                                  e,
                                  materials,
                                  setMaterials,
                                  newMaterial,
                                  setNewMaterial,
                                  'materials'
                                )
                              }
                              placeholder="Add material..."
                              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleAddItem(materials, setMaterials, newMaterial, setNewMaterial, 'materials')
                              }
                              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-lg transition-all duration-300"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                          {materials.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {materials.map((material, index) => (
                                <div
                                  key={index}
                                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200"
                                >
                                  <Tag className="w-4 h-4 text-purple-500" />
                                  <span className="text-sm font-medium text-gray-900">{material}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(materials, setMaterials, index)}
                                    className="ml-1 p-1 rounded-full hover:bg-red-100 transition-colors"
                                  >
                                    <X className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Accessory Specifications */}
                  {activeTab === 'accessoires' && (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-yellow-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-white text-sm font-medium text-yellow-600">
                            ACCESSORY DETAILS
                          </span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* Colors */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                            <Palette className="w-4 h-4 text-pink-500" />
                            Colors
                          </label>
                          <div className="flex gap-2">
                            <input
                              value={newColor}
                              onChange={(e) => setNewColor(e.target.value)}
                              onKeyPress={(e) =>
                                handleKeyPress(e, colors, setColors, newColor, setNewColor, 'colors')
                              }
                              placeholder="Add color..."
                              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddItem(colors, setColors, newColor, setNewColor, 'colors')}
                              className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold hover:shadow-lg transition-all duration-300"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                          {colors.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200"
                                >
                                  <div
                                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                    style={{ backgroundColor: color.toLowerCase() }}
                                  />
                                  <span className="text-sm font-medium text-gray-900">{color}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(colors, setColors, index)}
                                    className="ml-1 p-1 rounded-full hover:bg-red-100 transition-colors"
                                  >
                                    <X className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Sizes */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                            <Ruler className="w-4 h-4 text-cyan-500" />
                            Sizes (Taille)
                          </label>
                          <div className="flex gap-2">
                            <input
                              value={newTaille}
                              onChange={(e) => setNewTaille(e.target.value)}
                              onKeyPress={(e) =>
                                handleKeyPress(e, taille, setTaille, newTaille, setNewTaille, 'sizes')
                              }
                              placeholder="Add size..."
                              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddItem(taille, setTaille, newTaille, setNewTaille, 'sizes')}
                              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-lg transition-all duration-300"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                          {taille.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {taille.map((size, index) => (
                                <div
                                  key={index}
                                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200"
                                >
                                  <span className="text-sm font-bold text-cyan-700">{size}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(taille, setTaille, index)}
                                    className="ml-1 p-1 rounded-full hover:bg-red-100 transition-colors"
                                  >
                                    <X className="w-3 h-3 text-red-500" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Separator */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-yellow-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm font-medium text-yellow-600">
                        SHIPPING & WARRANTY
                      </span>
                    </div>
                  </div>

                  {/* Shipping & Warranty */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label
                          htmlFor="shippingDimensions"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <Package className="w-4 h-4 text-teal-500" />
                          Shipping Dimensions
                        </label>
                        <input
                          id="shippingDimensions"
                          name="shippingDimensions"
                          value={formData.shippingDimensions}
                          onChange={handleInputChange}
                          placeholder="e.g., 62 x 15 x 15 cm"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        />
                      </div>

                      <div className="space-y-3">
                        <label
                          htmlFor="shippingWeight"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <Scale className="w-4 h-4 text-orange-500" />
                          Shipping Weight (kg)
                        </label>
                        <input
                          id="shippingWeight"
                          name="shippingWeight"
                          type="number"
                          value={formData.shippingWeight}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="0"
                          step="0.1"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label
                          htmlFor="shippingMethod"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <Truck className="w-4 h-4 text-blue-500" />
                          Shipping Method
                        </label>
                        <select
                          id="shippingMethod"
                          name="shippingMethod"
                          value={formData.shippingMethod}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        >
                          <option value="">Select method</option>
                          <option value="Express">Express</option>
                          <option value="Standard">Standard</option>
                          <option value="Economy">Economy</option>
                          <option value="Pickup">Store Pickup</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label
                          htmlFor="estimatedDelivery"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <Calendar className="w-4 h-4 text-yellow-500" />
                          Estimated Delivery
                        </label>
                        <input
                          id="estimatedDelivery"
                          name="estimatedDelivery"
                          value={formData.estimatedDelivery}
                          onChange={handleInputChange}
                          placeholder="e.g., 1-2 jours ouvrés"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="warranty" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <Shield className="w-4 h-4 text-green-500" />
                        Warranty
                      </label>
                      <input
                        id="warranty"
                        name="warranty"
                        value={formData.warranty}
                        onChange={handleInputChange}
                        placeholder="e.g., 1 an"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-yellow-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm font-medium text-yellow-600">TAGS & SEO</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Tag className="w-4 h-4 text-indigo-500" />
                      Tags
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, tags, setTags, newTag, setNewTag, 'tags')}
                        placeholder="Add tag..."
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddItem(tags, setTags, newTag, setNewTag, 'tags')}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold hover:shadow-lg transition-all duration-300"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200"
                          >
                            <span className="text-sm font-bold text-indigo-700">#{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(tags, setTags, index)}
                              className="ml-1 p-1 rounded-full hover:bg-red-100 transition-colors"
                            >
                              <X className="w-3 h-3 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="rating" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Rating
                      </label>
                      <input
                        id="rating"
                        name="rating"
                        type="number"
                        value={formData.rating}
                        onChange={handleInputChange}
                        placeholder="0-5"
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-3">
                      <label
                        htmlFor="reviewCount"
                        className="flex items-center gap-2 text-sm font-bold text-gray-900"
                      >
                        <FileText className="w-4 h-4 text-rose-500" />
                        Review Count
                      </label>
                      <input
                        id="reviewCount"
                        name="reviewCount"
                        type="number"
                        value={formData.reviewCount}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="pt-8 border-t border-yellow-200">
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-bold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative px-12 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="relative flex items-center gap-3">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              <span>Publish Product</span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                All fields marked with <span className="text-red-500">*</span> are required. Make sure to review all
                information before publishing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }

        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
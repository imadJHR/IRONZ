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
  List,
  MessageSquare,
  User
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api';

// AWS Lambda Limit Safeguard (6MB total payload limit, setting 5.5MB as safe zone)
const MAX_TOTAL_PAYLOAD_SIZE = 5.5 * 1024 * 1024; 
const MAX_FILE_SIZE_MB = 2; 
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Updated categories to share a consistent Black/Yellow theme
const categories = [
  {
    id: 'equipements',
    label: 'Équipements',
    dbValue: 'Equipements',
    description: 'Gym equipment & weights',
    icon: Dumbbell,
    // Using dark theme for active state
    color: 'from-gray-900 to-black', 
  },
  {
    id: 'supplement',
    label: 'Supplément',
    dbValue: 'Supplément',
    description: 'Proteins & supplements',
    icon: Pill,
    color: 'from-gray-900 to-black',
  },
  {
    id: 'accessoires',
    label: 'Accessoires',
    dbValue: 'Accessoires',
    description: 'Clothing & accessories',
    icon: Shirt,
    color: 'from-gray-900 to-black',
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

  // Inputs for arrays
  const [newFeature, setNewFeature] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newTaille, setNewTaille] = useState('');
  const [newMaterial, setNewMaterial] = useState('');

  const [formData, setFormData] = useState(initialFormData);

  // Review State
  const [addReview, setAddReview] = useState(false);
  const [reviewData, setReviewData] = useState({
    username: '',
    rating: 5,
    title: '',
    body: ''
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

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

  const handleMainImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      showNotification(`File too large. Max size is ${MAX_FILE_SIZE_MB}MB`, 'error');
      return;
    }

    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
    showNotification('Main image uploaded successfully');
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = [];
    let oversizedCount = 0;

    files.forEach((file) => {
      if (file.size <= MAX_FILE_SIZE_BYTES) {
        validFiles.push(file);
      } else {
        oversizedCount++;
      }
    });

    if (oversizedCount > 0) {
      showNotification(`${oversizedCount} files skipped (limit ${MAX_FILE_SIZE_MB}MB)`, 'warning');
    }

    const newGallery = [...galleryImages, ...validFiles].slice(0, 10);
    setGalleryImages(newGallery);

    const newPreviews = newGallery.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(newPreviews);
    
    if (validFiles.length > 0) {
       showNotification(`${validFiles.length} image(s) added to gallery`);
    }
  };

  const removeGalleryImage = (index) => {
    const newGallery = galleryImages.filter((_, i) => i !== index);
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    setGalleryImages(newGallery);
    setGalleryPreviews(newPreviews);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleRemoveItem = (array, setArray, index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  const handleKeyPress = (e, array, setArray, newItem, setNewItem, typeLabel) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(array, setArray, newItem, setNewItem, typeLabel);
    }
  };

  const calculateFinalPrice = () => {
    const price = parseFloat(formData.price) || 0;
    const discount = parseFloat(formData.discount) || 0;

    if (discount > 0 && formData.oldPrice) {
      const oldPrice = parseFloat(formData.oldPrice);
      return oldPrice - (oldPrice * discount) / 100;
    }
    return price;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);

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

    // Validate Review if checked
    if (addReview) {
      if (!reviewData.username.trim()) {
        showNotification('Review username is required', 'error');
        return false;
      }
      if (!reviewData.rating) {
        showNotification('Review rating is required', 'error');
        return false;
      }
      if (!reviewData.title.trim()) {
        showNotification('Review title is required', 'error');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 1. Prepare Product Data
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);

      if (formData.oldPrice) formDataToSend.append('oldPrice', formData.oldPrice);
      if (formData.discount) formDataToSend.append('discount', formData.discount);
      if (formData.subCategory) formDataToSend.append('subCategory', formData.subCategory.trim());
      if (formData.stockQuantity) formDataToSend.append('stockQuantity', formData.stockQuantity);
      if (formData.sku) formDataToSend.append('sku', formData.sku.trim());
      if (formData.warranty) formDataToSend.append('warranty', formData.warranty.trim());
      
      formDataToSend.append('isNewProduct', formData.isNewProduct.toString());
      formDataToSend.append('isFeatured', formData.isFeatured.toString());
      formDataToSend.append('inStock', formData.inStock.toString());
      
      formDataToSend.append('features', JSON.stringify(features));
      formDataToSend.append('tags', JSON.stringify(tags));
      formDataToSend.append('colors', JSON.stringify(colors));
      formDataToSend.append('taille', JSON.stringify(taille));
      formDataToSend.append('materials', JSON.stringify(materials));

      const dimensions = {
        width: parseFloat(formData.width) || 0,
        height: parseFloat(formData.height) || 0,
        depth: parseFloat(formData.depth) || 0,
        weight: parseFloat(formData.weight) || 0,
      };
      formDataToSend.append('dimensions', JSON.stringify(dimensions));

      const shipping = {
        dimensions: formData.shippingDimensions || '',
        weight: parseFloat(formData.shippingWeight) || 0,
        method: formData.shippingMethod || '',
        estimatedDelivery: formData.estimatedDelivery || '',
      };
      formDataToSend.append('shipping', JSON.stringify(shipping));

      // Calculate Total Size for Safety Check
      let totalSize = 0;
      if (mainImage) {
        formDataToSend.append('image', mainImage);
        totalSize += mainImage.size;
      }

      galleryImages.forEach((file) => {
        formDataToSend.append('gallery', file);
        totalSize += file.size;
      });

      // 2. Safety Check for Lambda Limit (approx 6MB hard limit)
      if (totalSize > MAX_TOTAL_PAYLOAD_SIZE) {
        throw new Error(`Total file size too large (${(totalSize / 1024 / 1024).toFixed(2)}MB). Limit is 5.5MB.`);
      }

      // 3. Create Product
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        body: formDataToSend,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add product');
      }

      // 4. Create Review (if selected)
      const createdProduct = responseData.data || responseData.product || responseData;
      const newProductId = createdProduct._id || createdProduct.id;

      if (addReview && newProductId) {
        const reviewPayload = {
            username: reviewData.username,
            rating: parseInt(reviewData.rating),
            title: reviewData.title,
            body: reviewData.body
        };

        const reviewResponse = await fetch(`${API_URL}/products/${newProductId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewPayload)
        });

        if (!reviewResponse.ok) {
            console.warn('Product created but review failed');
            showNotification('Product created, but review failed to save', 'warning');
        } else {
             showNotification('Product and review added successfully!');
        }
      } else {
        showNotification('Product added successfully!');
      }

      // 5. Redirect
      setTimeout(() => {
        router.push('/ironz-setup');
      }, 1500);

    } catch (error) {
      console.error('Error adding product:', error);
      showNotification(error.message || 'Failed to add product', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategory = categories.find((c) => c.id === activeTab);
  const completion = formData.name && formData.description && formData.price ? '80%' : '40%';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-8 font-sans">
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-slideInRight">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm ${
              toast.type === 'success'
                ? 'bg-black text-white border border-yellow-500' // Black bg with yellow accent for success
                : toast.type === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-yellow-500 text-black'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-yellow-400" />
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
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 text-gray-900 group-hover:text-yellow-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900">Retour</span>
            </button>
            <button
              onClick={() => router.push('/ironz-setup/products')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black border border-black text-yellow-400 font-bold hover:bg-gray-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <List className="w-5 h-5" />
              <span>Gérer le stock</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-yellow-400 shadow-lg">
                  <Package className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Add New Product
                  </h1>
                  <p className="text-gray-500 mt-2 text-lg">
                    Create amazing products for <span className="text-yellow-600 font-bold">Ironz</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-2 rounded-lg bg-gray-100">
                  {selectedCategory && <selectedCategory.icon className="w-5 h-5 text-gray-900" />}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Current Category</div>
                  <div className="font-bold text-gray-900">{selectedCategory?.label}</div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group relative px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      <Zap className="w-4 h-4 ml-1 fill-black" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gray-900">
                  <Package className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Product Category</h2>
                  <p className="text-sm text-gray-500">Choose the right category</p>
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
                          ? `bg-gray-900 text-white shadow-lg border border-gray-900`
                          : 'bg-white border border-gray-200 hover:border-yellow-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            isActive ? 'bg-white/10' : 'bg-gray-100'
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${isActive ? 'text-yellow-400' : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                            {category.label}
                          </div>
                          <div className={`text-sm mt-1 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                            {category.description}
                          </div>
                        </div>
                        {isActive && (
                          <div className="p-1 rounded-full bg-yellow-500 text-black">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Package2 className="w-5 h-5 text-yellow-600" />
                Quick Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <ImageIcon className="w-4 h-4 text-gray-900" />
                    </div>
                    <span className="font-medium text-gray-700">Main Image</span>
                  </div>
                  <span className={`font-bold ${mainImage ? 'text-green-600' : 'text-red-500'}`}>
                    {mainImage ? '✓ Uploaded' : 'Required'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <Grid3x3 className="w-4 h-4 text-gray-900" />
                    </div>
                    <span className="font-medium text-gray-700">Gallery Images</span>
                  </div>
                  <span className="font-bold text-gray-900">{galleryImages.length}/10</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <Layers className="w-4 h-4 text-gray-900" />
                    </div>
                    <span className="font-medium text-gray-700">Features</span>
                  </div>
                  <span className="font-bold text-gray-900">{features.length} added</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-gray-200">
                      <CheckCircle className="w-4 h-4 text-gray-900" />
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

              {formData.price && (
                <div className="mt-6 pt-6 border-t border-gray-100">
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
                    <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-sm font-bold">{formData.discount}% OFF</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                    <p className="text-gray-500 mt-1">
                      Fill in the details for your product
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-black text-yellow-400">
                    <span className="text-sm font-bold">STEP 2</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-yellow-600" />
                      Product Images
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <div className="p-2 rounded-lg bg-yellow-100">
                            <ImageIcon className="w-4 h-4 text-yellow-700" />
                          </div>
                          <span>Main Image</span>
                          <span className="text-red-500 ml-0.5">*</span>
                        </label>

                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-50 group"
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
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-medium transition-all duration-300"
                              >
                                <Trash2 className="w-4 h-4" />
                                Remove
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="mx-auto w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-yellow-100 transition-colors duration-300">
                                <Upload className="w-8 h-8 text-gray-400 group-hover:text-yellow-600" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">Click to upload</p>
                                <p className="text-sm text-gray-500 mt-2">PNG, JPG, WebP up to {MAX_FILE_SIZE_MB}MB</p>
                              </div>
                              <button
                                type="button"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300"
                              >
                                Browse Files
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <div className="p-2 rounded-lg bg-gray-100">
                            <Grid3x3 className="w-4 h-4 text-gray-700" />
                          </div>
                          Gallery Images
                        </label>

                        <div
                          onClick={() => galleryInputRef.current?.click()}
                          className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-gray-500 hover:bg-gray-50 group"
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
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                              <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">Drag & drop images</p>
                              <p className="text-sm text-gray-500 mt-2">Up to 10 images, {MAX_FILE_SIZE_MB}MB each</p>
                            </div>
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
                            >
                              <Upload className="w-4 h-4" />
                              Select Images
                            </button>
                          </div>
                        </div>

                        {galleryPreviews.length > 0 && (
                          <div className="mt-6">
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-medium text-gray-900">Selected Images:</span>
                              <span className="text-sm font-bold text-yellow-600">
                                {galleryImages.length}/10
                              </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {galleryPreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                  <div className="aspect-square rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow border border-gray-200">
                                    <img
                                      src={preview}
                                      alt={`Gallery ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
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

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm font-medium text-gray-500">
                        BASIC INFORMATION
                      </span>
                    </div>
                  </div>

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
                          <Hash className="w-4 h-4 text-gray-500" />
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
                        <FileText className="w-4 h-4 text-gray-500" />
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

                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <Layers className="w-4 h-4 text-yellow-500" />
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
                          className="px-6 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      {features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {features.map((feature, index) => (
                            <div
                              key={index}
                              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200"
                            >
                              <Tag className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium text-gray-900">{feature}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(features, setFeatures, index)}
                                className="ml-1 p-1 rounded-full hover:bg-red-200 hover:text-red-600 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm font-medium text-gray-500">
                        PRICING & STOCK
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <label
                          htmlFor="price"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <DollarSign className="w-4 h-4 text-green-600" />
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
                            <Percent className="w-4 h-4 text-yellow-500" />
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
                          <Package2 className="w-4 h-4 text-yellow-500" />
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
                          <Layers className="w-4 h-4 text-gray-500" />
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

                    <div className="flex flex-wrap gap-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
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
                                ? 'bg-yellow-500'
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
                                ? 'bg-yellow-500'
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
                                ? 'bg-green-500'
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

                  {activeTab === 'equipements' && (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-white text-sm font-medium text-gray-500">
                            EQUIPMENT SPECIFICATIONS
                          </span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-3">
                            <label htmlFor="width" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                              <Ruler className="w-4 h-4 text-gray-500" />
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
                              <Ruler className="w-4 h-4 text-gray-500" />
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
                              <Ruler className="w-4 h-4 text-gray-500" />
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
                              <Scale className="w-4 h-4 text-gray-500" />
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

                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                            <Layers className="w-4 h-4 text-yellow-500" />
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
                              className="px-6 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                          {materials.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {materials.map((material, index) => (
                                <div
                                  key={index}
                                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200"
                                >
                                  <Tag className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm font-medium text-gray-900">{material}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(materials, setMaterials, index)}
                                    className="ml-1 p-1 rounded-full hover:bg-red-200 hover:text-red-600 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'accessoires' && (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-white text-sm font-medium text-gray-500">
                            ACCESSORY DETAILS
                          </span>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                            <Palette className="w-4 h-4 text-yellow-500" />
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
                              className="px-6 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                          {colors.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200"
                                >
                                  <div
                                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                    style={{ backgroundColor: color.toLowerCase() }}
                                  />
                                  <span className="text-sm font-medium text-gray-900">{color}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(colors, setColors, index)}
                                    className="ml-1 p-1 rounded-full hover:bg-red-200 hover:text-red-600 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                            <Ruler className="w-4 h-4 text-gray-500" />
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
                              className="px-6 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                          {taille.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {taille.map((size, index) => (
                                <div
                                  key={index}
                                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200"
                                >
                                  <span className="text-sm font-bold text-gray-900">{size}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveItem(taille, setTaille, index)}
                                    className="ml-1 p-1 rounded-full hover:bg-red-200 hover:text-red-600 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm font-medium text-gray-500">
                        SHIPPING & WARRANTY
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label
                          htmlFor="shippingDimensions"
                          className="flex items-center gap-2 text-sm font-bold text-gray-900"
                        >
                          <Package className="w-4 h-4 text-gray-500" />
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
                          <Truck className="w-4 h-4 text-gray-500" />
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
                        <Shield className="w-4 h-4 text-green-600" />
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

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm font-medium text-gray-500">TAGS & SEO</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Tag className="w-4 h-4 text-yellow-500" />
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
                        className="px-6 py-3 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag, index) => (
                          <div
                            key={index}
                            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200"
                          >
                            <span className="text-sm font-bold text-gray-900">#{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(tags, setTags, index)}
                              className="ml-1 p-1 rounded-full hover:bg-red-200 hover:text-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white text-sm font-medium text-gray-500">
                        INITIAL REVIEW (OPTIONAL)
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-yellow-500" />
                        <h3 className="font-bold text-gray-900">Add an Initial Review</h3>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={addReview}
                          onChange={(e) => setAddReview(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>

                    {addReview && (
                      <div className="space-y-4 animate-slideInRight">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                               <User className="w-4 h-4 text-gray-500" />
                               Username
                             </label>
                             <input
                               name="username"
                               value={reviewData.username}
                               onChange={handleReviewChange}
                               className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-yellow-500 outline-none"
                               placeholder="Reviewer Name"
                             />
                           </div>
                           <div className="space-y-2">
                             <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                               <Star className="w-4 h-4 text-yellow-500" />
                               Rating (1-5)
                             </label>
                             <input
                               type="number"
                               name="rating"
                               min="1"
                               max="5"
                               value={reviewData.rating}
                               onChange={handleReviewChange}
                               className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-yellow-500 outline-none"
                             />
                           </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900">Title</label>
                            <input
                              name="title"
                              value={reviewData.title}
                              onChange={handleReviewChange}
                              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-yellow-500 outline-none"
                              placeholder="Great product!"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900">Comment</label>
                            <textarea
                              name="body"
                              rows={3}
                              value={reviewData.body}
                              onChange={handleReviewChange}
                              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-yellow-500 outline-none"
                              placeholder="Details about the experience..."
                            />
                         </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 border-t border-gray-200">
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
                        className="group relative px-12 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
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

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                All fields marked with <span className="text-red-500">*</span> are required. Make sure to review all
                information before publishing.
              </p>
            </div>
          </div>
        </div>
      </div>
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
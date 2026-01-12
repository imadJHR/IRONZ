'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Percent,
  Hash,
  Package2,
  FileText,
  Grid3x3,
  CheckCircle,
  AlertCircle,
  Zap,
  LayoutList
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api';

// Catégories
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

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // États
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('equipements');
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

  // Inputs
  const [newFeature, setNewFeature] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newTaille, setNewTaille] = useState('');
  const [newMaterial, setNewMaterial] = useState('');

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    discount: '',
    category: 'Equipements',
    subCategory: '', // NEW: subCategory
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
  });

  // Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Refs
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // --- 1. FETCH PRODUCT ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/products/id/${id}`);
        const result = await res.json();

        if (!result.success && !result.data) {
          // Fallback si le format API est différent
          if (result._id) result.data = result;
          else throw new Error('Produit introuvable');
        }

        const product = result.data || result;

        // Mapper les données
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          oldPrice: product.oldPrice || '',
          discount: product.discount || '',
          category: product.category || 'Equipements',
          subCategory: product.subCategory || '', // Mapper subCategory
          rating: product.rating || 0,
          reviewCount: product.reviewCount || 0,
          isNewProduct: product.isNewProduct || false,
          isFeatured: product.isFeatured || false,
          inStock: product.inStock,
          stockQuantity: product.stockQuantity || '',
          sku: product.sku || '',
          warranty: product.warranty || '',
          width: product.dimensions?.width || '',
          height: product.dimensions?.height || '',
          depth: product.dimensions?.depth || '',
          weight: product.dimensions?.weight || '',
          shippingDimensions: product.shipping?.dimensions || '',
          shippingWeight: product.shipping?.weight || '',
          shippingMethod: product.shipping?.method || '',
          estimatedDelivery: product.shipping?.estimatedDelivery || '',
        });

        // Remplir les tableaux
        setFeatures(product.features || []);
        setTags(product.tags || []);
        setColors(product.colors || []);
        setTaille(product.taille || []);
        setMaterials(product.materials || []);

        // Gérer les images
        if (product.image) setMainImagePreview(product.image);
        if (product.gallery && product.gallery.length > 0) {
          setGalleryPreviews(product.gallery);
        }

        // Définir la catégorie active
        const catObj = categories.find(c => c.dbValue.toLowerCase() === (product.category || '').toLowerCase());
        if (catObj) setActiveTab(catObj.id);
        else setActiveTab('equipements');
      } catch (error) {
        console.error('Error fetching product:', error);
        showNotification("Erreur lors du chargement du produit", "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // --- Toast ---
  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // --- Auto-calcul discount ---
  useEffect(() => {
    if (!autoDiscount) return;
    const price = parseFloat(formData.price);
    const oldPrice = parseFloat(formData.oldPrice);

    if (isNaN(price) || isNaN(oldPrice) || oldPrice <= 0 || price <= 0 || price >= oldPrice) {
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

  // --- Handle main image upload ---
  const handleMainImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotification('File size exceeds 5MB', 'error');
      return;
    }

    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
    showNotification('Nouvelle image principale sélectionnée');
  };

  // --- Handle gallery upload ---
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);

    setGalleryImages(prev => [...prev, ...validFiles]);
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(prev => [...prev, ...newPreviews]);

    showNotification(`${validFiles.length} image(s) ajoutée(s)`);
  };

  // --- Remove gallery image ---
  const removeGalleryImage = (index) => {
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    setGalleryPreviews(newPreviews);
    showNotification("Image retirée de la vue");
  };

  // --- Handle input change ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // --- Add item ---
  const handleAddItem = (array, setArray, newItem, setNewItem) => {
    const value = newItem.trim();
    if (!value) return;
    if (array.includes(value)) {
      showNotification(`${value} exists already`, 'warning');
      return;
    }
    setArray([...array, value]);
    setNewItem('');
    showNotification(`${value} added`);
  };

  // --- Remove item ---
  const handleRemoveItem = (array, setArray, index) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    setArray(newArray);
  };

  // --- Key press ---
  const handleKeyPress = (e, array, setArray, newItem, setNewItem) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(array, setArray, newItem, setNewItem);
    }
  };

  // --- Calculate final price ---
  const calculateFinalPrice = () => {
    const price = parseFloat(formData.price) || 0;
    const discount = parseFloat(formData.discount) || 0;
    if (discount > 0 && formData.oldPrice) {
      const oldPrice = parseFloat(formData.oldPrice);
      return oldPrice - (oldPrice * discount) / 100;
    }
    return price;
  };

  // --- Format currency ---
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(amount);

  // --- Validate form ---
  const validateForm = () => {
    if (!formData.name.trim()) { showNotification('Nom du produit requis', 'error'); return false; }
    if (!formData.price || parseFloat(formData.price) <= 0) { showNotification('Prix valide requis', 'error'); return false; }
    return true;
  };

  // --- SUBMIT ---
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
      formDataToSend.append('subCategory', formData.subCategory.trim()); // NEW: subCategory

      // Optional fields
      if (formData.oldPrice) formDataToSend.append('oldPrice', formData.oldPrice);
      if (formData.discount) formDataToSend.append('discount', formData.discount);
      if (formData.rating) formDataToSend.append('rating', formData.rating);
      if (formData.reviewCount) formDataToSend.append('reviewCount', formData.reviewCount);
      if (formData.stockQuantity) formDataToSend.append('stockQuantity', formData.stockQuantity);
      if (formData.sku) formDataToSend.append('sku', formData.sku.trim());
      if (formData.warranty) formDataToSend.append('warranty', formData.warranty.trim());

      // Booleans
      formDataToSend.append('isNewProduct', formData.isNewProduct.toString());
      formDataToSend.append('isFeatured', formData.isFeatured.toString());
      formDataToSend.append('inStock', formData.inStock.toString());

      // Arrays (JSON stringified)
      formDataToSend.append('features', JSON.stringify(features));
      formDataToSend.append('tags', JSON.stringify(tags));
      formDataToSend.append('colors', JSON.stringify(colors));
      formDataToSend.append('taille', JSON.stringify(taille));
      formDataToSend.append('materials', JSON.stringify(materials));

      // Nested objects
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

      // Images
      if (mainImage) formDataToSend.append('image', mainImage);
      galleryImages.forEach((file) => {
        formDataToSend.append('gallery', file);
      });

      // PUT request
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update product');
      }

      showNotification('Produit mis à jour avec succès !');

      // Redirect
      setTimeout(() => {
        router.push('/ironz-setup/products');
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'Failed to update', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Selected category
  const selectedCategory = categories.find((c) => c.id === activeTab);
  const completion = formData.name && formData.description && formData.price ? '100%' : '50%';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-4 md:p-8">
      {/* Toast */}
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
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-yellow-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700">Retour</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 shadow-lg">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                    Modifier le Produit
                  </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    Mise à jour des informations de : <span className="font-semibold text-yellow-700">{formData.name}</span>
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
                  <div className="text-sm text-gray-600">Catégorie</div>
                  <div className="font-bold text-gray-900">{selectedCategory?.label || formData.category}</div>
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
                      <span>Sauvegarde...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Mettre à jour</span>
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
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-yellow-500" />
                Catégorie
              </h3>

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
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Package2 className="w-5 h-5 text-yellow-500" />
                Aperçu Rapide
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                      <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">Image</span>
                  </div>
                  <span className={`font-bold ${mainImagePreview ? 'text-green-600' : 'text-red-500'}`}>
                    {mainImagePreview ? '✓ Présente' : 'Manquante'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                      <Grid3x3 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">Galerie</span>
                  </div>
                  <span className="font-bold text-gray-900">{galleryPreviews.length}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700">Complétion</span>
                  </div>
                  <span className="font-bold text-green-600">{completion}</span>
                </div>
              </div>

              {/* Price Preview */}
              {formData.price && (
                <div className="mt-6 pt-6 border-t border-yellow-200">
                  <div className="text-sm text-gray-600 mb-2">Prix affiché au client</div>
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              {/* Form Header */}
              <div className="p-6 border-b border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Détails du Produit</h2>
                    <p className="text-gray-600 mt-1">
                      Modifiez les informations ci-dessous
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Product Images */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-yellow-500" />
                      Images du produit
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Main Image */}
                      <div className="space-y-4">
                        <label htmlFor="mainImage" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
                            <ImageIcon className="w-4 h-4 text-white" />
                          </div>
                          <span>Image Principale</span>
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
                            required
                          />
                          {mainImagePreview ? (
                            <div className="space-y-4">
                              <div className="relative mx-auto w-32 h-32 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                                <img
                                  src={mainImagePreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-white font-bold text-sm">Changer</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-500">Cliquer pour remplacer</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Upload className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900">Uploader une image</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Gallery Images */}
                      <div className="space-y-4">
                        <label htmlFor="galleryImages" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                            <Grid3x3 className="w-4 h-4 text-white" />
                          </div>
                          Galerie
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
                              <Plus className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">Ajouter des images</p>
                            </div>
                          </div>
                        </div>

                        {/* Gallery Preview Grid */}
                        {galleryPreviews.length > 0 && (
                          <div className="mt-6">
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
                                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                                    title="Retirer de la vue"
                                  >
                                    <X className="w-3 h-3" />
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
                        INFORMATIONS DE BASE
                      </span>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nom du produit */}
                    <div className="space-y-3">
                      <label htmlFor="name" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <ShoppingBag className="w-4 h-4 text-yellow-500" />
                        <span>Nom du produit</span>
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        required
                      />
                    </div>

                    {/* SKU & SubCategory */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label htmlFor="sku" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                            <Hash className="w-4 h-4 text-purple-500" />
                            SKU (Code Article)
                          </label>
                          <input
                            id="sku"
                            name="sku"
                            value={formData.sku}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                          />
                        </div>

                        {/* ADDED: SubCategory */}
                        <div className="space-y-3">
                          <label htmlFor="subCategory" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                            <LayoutList className="w-4 h-4 text-orange-500" />
                            Sous-catégorie
                          </label>
                          <input
                            id="subCategory"
                            name="subCategory"
                            value={formData.subCategory}
                            onChange={handleInputChange}
                            placeholder="Ex: Protéine, Vitamines..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="description" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <FileText className="w-4 h-4 text-green-500" />
                        <span>Description</span>
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <Layers className="w-4 h-4 text-blue-500" />
                        Caractéristiques (Features)
                      </label>
                      <div className="flex gap-2">
                        <input
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, features, setFeatures, newFeature, setNewFeature)}
                          placeholder="Ajouter une caractéristique..."
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddItem(features, setFeatures, newFeature, setNewFeature)}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:shadow-lg transition-all duration-300"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      {features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {features.map((feature, index) => (
                            <div key={index} className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                              <span className="text-sm font-medium text-gray-900">{feature}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveItem(features, setFeatures, index)}
                                className="ml-1 text-red-500 hover:text-red-700"
                              >
                                <X className="w-3 h-3" />
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
                        PRIX & STOCK
                      </span>
                    </div>
                  </div>

                  {/* Pricing & Stock */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="price" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        Prix (MAD)
                      </label>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="oldPrice" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <TrendingUp className="w-4 h-4 text-red-500" />
                        Ancien Prix
                      </label>
                      <input
                        id="oldPrice"
                        name="oldPrice"
                        type="number"
                        step="0.01"
                        value={formData.oldPrice}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="discount" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <Percent className="w-4 h-4 text-orange-500" />
                          Réduction %
                        </label>
                        <label className="flex items-center gap-1 text-[11px] text-gray-500 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={autoDiscount}
                            onChange={(e) => setAutoDiscount(e.target.checked)}
                            className="h-3 w-3 accent-yellow-500"
                          />
                          <span>Auto</span>
                        </label>
                      </div>
                      <input
                        id="discount"
                        name="discount"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.discount}
                        onChange={handleInputChange}
                        disabled={autoDiscount}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="stockQuantity" className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <Package2 className="w-4 h-4 text-purple-500" />
                        Quantité en Stock
                      </label>
                      <input
                        id="stockQuantity"
                        name="stockQuantity"
                        type="number"
                        value={formData.stockQuantity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="flex flex-wrap gap-6 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 mt-6 items-center">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="inStock"
                          checked={formData.inStock}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                        />
                        <span className="font-medium text-gray-900">En Stock</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="isNewProduct"
                          checked={formData.isNewProduct}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                        />
                        <span className="font-medium text-gray-900">Nouveau</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="isFeatured"
                          checked={formData.isFeatured}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                        />
                        <span className="font-medium text-gray-900">Vedette</span>
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
                        DIMENSIONS & MATÉRIAUX
                      </span>
                    </div>
                  </div>

                  {/* Dimensions & Materials */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Dimensions */}
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Largeur</label>
                      <input
                        name="width"
                        type="number"
                        value={formData.width}
                        onChange={handleInputChange}
                        placeholder="cm"
                        className="w-full p-3 border rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Hauteur</label>
                      <input
                        name="height"
                        type="number"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="cm"
                        className="w-full p-3 border rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Profondeur</label>
                      <input
                        name="depth"
                        type="number"
                        value={formData.depth}
                        onChange={handleInputChange}
                        placeholder="cm"
                        className="w-full p-3 border rounded-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500">Poids</label>
                      <input
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="kg"
                        className="w-full p-3 border rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Shipping */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Package className="w-4 h-4 text-purple-500" />
                      Expédition
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, materials, setMaterials, newMaterial, setNewMaterial)}
                        placeholder="Ajouter un matériau"
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddItem(materials, setMaterials, newMaterial, setNewMaterial)}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-500 text-white font-bold hover:shadow-lg transition-all duration-300"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                    {materials.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {materials.map((m, i) => (
                          <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm cursor-pointer" onClick={() => handleRemoveItem(materials, setMaterials, i)}>
                            {m} <X className="w-3 h-3" />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8 border-t border-yellow-200">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-3">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Mise à jour en cours...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <Save className="w-5 h-5" />
                          <span>Mettre à jour le produit</span>
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
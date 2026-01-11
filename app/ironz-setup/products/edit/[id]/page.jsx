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

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // États de chargement
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('equipements');
  const [autoDiscount, setAutoDiscount] = useState(false);

  // Images
  const [mainImage, setMainImage] = useState(null); // Fichier (nouvel upload)
  const [mainImagePreview, setMainImagePreview] = useState(''); // URL (existant ou preview)
  const [galleryImages, setGalleryImages] = useState([]); // Fichiers (nouveaux uploads)
  const [galleryPreviews, setGalleryPreviews] = useState([]); // URLs (existants + previews)

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
  const [formData, setFormData] = useState({
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
    // Dimensions éclatées
    width: '',
    height: '',
    depth: '',
    weight: '',
    // Shipping éclaté
    shippingDimensions: '',
    shippingWeight: '',
    shippingMethod: '',
    estimatedDelivery: '',
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Refs
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // --- 1. FETCH PRODUCT DATA ---
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/products/id/${id}`);
        const result = await res.json();

        if (!result.success) {
            throw new Error('Produit introuvable');
        }

        const product = result.data;

        // Mapper les données reçues (format imbriqué) vers le state local (format plat)
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          oldPrice: product.oldPrice || '',
          discount: product.discount || '',
          category: product.category || 'Equipements',
          subCategory: product.subCategory || '',
          rating: product.rating || '',
          reviewCount: product.reviewCount || '',
          isNewProduct: product.isNewProduct || false,
          isFeatured: product.isFeatured || false,
          inStock: product.inStock,
          stockQuantity: product.stockQuantity || '',
          sku: product.sku || '',
          warranty: product.warranty || '',
          
          // Mapping Dimensions
          width: product.dimensions?.width || '',
          height: product.dimensions?.height || '',
          depth: product.dimensions?.depth || '',
          weight: product.dimensions?.weight || '',
          
          // Mapping Shipping
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

        // Gestion des images
        if (product.image) {
            setMainImagePreview(product.image); // URL Cloudinary existante
        }
        if (product.gallery && product.gallery.length > 0) {
            setGalleryPreviews(product.gallery); // URLs Cloudinary existantes
        }

        // Définir la catégorie active pour l'UI
        const catObj = categories.find(c => c.dbValue === product.category);
        if (catObj) setActiveTab(catObj.id);

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


  // Toast notification
  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Auto-calc discount
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

  // Handle main image upload (Replacement)
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

  // Handle gallery upload (Appending)
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = files.filter((file) => file.size <= 5 * 1024 * 1024);

    // Ajout aux fichiers à uploader
    setGalleryImages(prev => [...prev, ...validFiles]);

    // Ajout aux previews (mixte URLs existantes + blobs locaux)
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(prev => [...prev, ...newPreviews]);

    showNotification(`${validFiles.length} image(s) ajoutée(s)`);
  };

  // Remove gallery image (Visual only for now)
  const removeGalleryImage = (index) => {
    // Note: Une logique plus complexe serait nécessaire pour supprimer des images spécifiques du serveur
    // Ici on les retire juste de la vue et de la liste d'upload si c'est des nouveaux fichiers
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    setGalleryPreviews(newPreviews);
    // On ne touche pas à galleryImages (fichiers) car l'index ne correspond pas forcément si on a mixé URLs et Fichiers
    showNotification("Image retirée de la vue (Sauvegarder pour confirmer)");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddItem = (array, setArray, newItem, setNewItem, typeLabel) => {
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
    new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(amount);

  const validateForm = () => {
    if (!formData.name.trim()) { showNotification('Product name required', 'error'); return false; }
    if (!formData.price || parseFloat(formData.price) <= 0) { showNotification('Valid price required', 'error'); return false; }
    return true;
  };

  // --- SUBMIT (PUT REQUEST) ---
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

      // Booleans
      formDataToSend.append('isNewProduct', formData.isNewProduct.toString());
      formDataToSend.append('isFeatured', formData.isFeatured.toString());
      formDataToSend.append('inStock', formData.inStock.toString());

      // Arrays
      formDataToSend.append('features', JSON.stringify(features));
      formDataToSend.append('tags', JSON.stringify(tags));
      formDataToSend.append('colors', JSON.stringify(colors));
      formDataToSend.append('taille', JSON.stringify(taille));
      formDataToSend.append('materials', JSON.stringify(materials));

      // Objects
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

      // Images Handling for Update
      // 1. Image Principale: Seulement si un nouveau fichier a été choisi
      if (mainImage) {
        formDataToSend.append('image', mainImage);
      }

      // 2. Galerie: On envoie les NOUVEAUX fichiers
      galleryImages.forEach((file) => {
        formDataToSend.append('gallery', file);
      });

      // Send PUT request
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
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Catégorie</h2>
                  <p className="text-sm text-gray-600">Changer la catégorie si nécessaire</p>
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
                Aperçu Rapide
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-yellow-200 shadow-lg overflow-hidden">
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
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
                            <ImageIcon className="w-4 h-4 text-white" />
                          </div>
                          <span>Image Principale</span>
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
                                {/* Overlay to indicate replace */}
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
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
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
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        rows={4}
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
                              <button type="button" onClick={() => handleRemoveItem(features, setFeatures, index)} className="ml-1 text-red-500 hover:text-red-700">
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
                  <div className="space-y-6">
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
                                <input type="checkbox" checked={autoDiscount} onChange={(e) => setAutoDiscount(e.target.checked)} className="h-3 w-3 accent-yellow-500"/>
                                <span>Auto</span>
                            </label>
                        </div>
                        <input
                          id="discount"
                          name="discount"
                          type="number"
                          value={formData.discount}
                          onChange={handleInputChange}
                          disabled={autoDiscount}
                          className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 outline-none ${autoDiscount ? 'bg-gray-100' : ''}`}
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
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 outline-none"
                        />
                      </div>
                      
                      {/* Toggles */}
                      <div className="flex flex-wrap gap-6 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 mt-6 items-center">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleInputChange} className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"/>
                            <span className="font-medium text-gray-900">En Stock</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="isNewProduct" checked={formData.isNewProduct} onChange={handleInputChange} className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"/>
                            <span className="font-medium text-gray-900">Nouveau</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"/>
                            <span className="font-medium text-gray-900">Vedette</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* SPÉCIFICATIONS PAR CATÉGORIE */}
                  {activeTab === 'equipements' && (
                    <>
                      <div className="relative my-8"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-yellow-200"></div></div><div className="relative flex justify-center"><span className="px-4 bg-white text-sm font-medium text-yellow-600">SPÉCIFICATIONS</span></div></div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <input name="width" type="number" value={formData.width} onChange={handleInputChange} placeholder="Largeur (cm)" className="p-3 border rounded-xl" />
                        <input name="height" type="number" value={formData.height} onChange={handleInputChange} placeholder="Hauteur (cm)" className="p-3 border rounded-xl" />
                        <input name="depth" type="number" value={formData.depth} onChange={handleInputChange} placeholder="Profondeur (cm)" className="p-3 border rounded-xl" />
                        <input name="weight" type="number" value={formData.weight} onChange={handleInputChange} placeholder="Poids (kg)" className="p-3 border rounded-xl" />
                      </div>
                      {/* Materials */}
                      <div className="mt-4">
                        <label className="text-sm font-bold block mb-2">Matériaux</label>
                        <div className="flex gap-2">
                           <input value={newMaterial} onChange={e => setNewMaterial(e.target.value)} onKeyPress={e => handleKeyPress(e, materials, setMaterials, newMaterial, setNewMaterial)} placeholder="Ajouter un matériau" className="flex-1 p-3 border rounded-xl"/>
                           <button type="button" onClick={() => handleAddItem(materials, setMaterials, newMaterial, setNewMaterial)} className="bg-purple-100 text-purple-600 px-4 rounded-xl font-bold">+</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">{materials.map((m, i) => <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm cursor-pointer" onClick={() => handleRemoveItem(materials, setMaterials, i)}>{m} ×</span>)}</div>
                      </div>
                    </>
                  )}

                  {activeTab === 'accessoires' && (
                     <>
                      <div className="relative my-8"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-yellow-200"></div></div><div className="relative flex justify-center"><span className="px-4 bg-white text-sm font-medium text-yellow-600">DÉTAILS ACCESSOIRES</span></div></div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="font-bold text-sm block mb-2">Couleurs</label>
                            <div className="flex gap-2"><input value={newColor} onChange={e => setNewColor(e.target.value)} onKeyPress={e => handleKeyPress(e, colors, setColors, newColor, setNewColor)} className="flex-1 p-3 border rounded-xl" placeholder="Ajouter couleur"/><button type="button" onClick={() => handleAddItem(colors, setColors, newColor, setNewColor)} className="bg-pink-100 text-pink-600 px-4 rounded-xl">+</button></div>
                            <div className="flex flex-wrap gap-2 mt-2">{colors.map((c, i) => <span key={i} className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-sm cursor-pointer" onClick={() => handleRemoveItem(colors, setColors, i)}>{c} ×</span>)}</div>
                         </div>
                         <div>
                            <label className="font-bold text-sm block mb-2">Tailles</label>
                            <div className="flex gap-2"><input value={newTaille} onChange={e => setNewTaille(e.target.value)} onKeyPress={e => handleKeyPress(e, taille, setTaille, newTaille, setNewTaille)} className="flex-1 p-3 border rounded-xl" placeholder="Ajouter taille"/><button type="button" onClick={() => handleAddItem(taille, setTaille, newTaille, setNewTaille)} className="bg-cyan-100 text-cyan-600 px-4 rounded-xl">+</button></div>
                            <div className="flex flex-wrap gap-2 mt-2">{taille.map((t, i) => <span key={i} className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm cursor-pointer" onClick={() => handleRemoveItem(taille, setTaille, i)}>{t} ×</span>)}</div>
                         </div>
                      </div>
                     </>
                  )}

                  {/* Tags */}
                  <div className="relative my-8"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-yellow-200"></div></div><div className="relative flex justify-center"><span className="px-4 bg-white text-sm font-medium text-yellow-600">TAGS & SEO</span></div></div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Tag className="w-4 h-4 text-indigo-500" />
                      Tags
                    </label>
                    <div className="flex gap-2">
                      <input value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyPress={(e) => handleKeyPress(e, tags, setTags, newTag, setNewTag)} placeholder="Ajouter un tag..." className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 outline-none" />
                      <button type="button" onClick={() => handleAddItem(tags, setTags, newTag, setNewTag)} className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:shadow-lg"><Plus className="w-5 h-5" /></button>
                    </div>
                    {tags.length > 0 && <div className="flex flex-wrap gap-2 mt-3">{tags.map((tag, index) => (<span key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold text-sm cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors" onClick={() => handleRemoveItem(tags, setTags, index)}>#{tag}</span>))}</div>}
                  </div>

                  {/* Actions */}
                  <div className="pt-8 border-t border-yellow-200 flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50">Annuler</button>
                    <button type="submit" disabled={isSubmitting} className="group relative px-12 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50">
                       <div className="flex items-center gap-2">
                         {isSubmitting ? <Loader2 className="animate-spin"/> : <Save className="w-5 h-5"/>}
                         <span>Mettre à jour</span>
                       </div>
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out; }
        input[type='number']::-webkit-inner-spin-button, input[type='number']::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </div>
  );
}
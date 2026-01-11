'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Package,
  Filter,
  Loader2,
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api';

export default function ProductListPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isDeleting, setIsDeleting] = useState(null);
  
  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter]);

  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Récupère jusqu'à 100 produits, triés par les plus récents
      let url = `${API_URL}/products?limit=100&sort=newest`;
      if (categoryFilter) url += `&category=${categoryFilter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showNotification('Erreur de connexion au serveur', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    setIsDeleting(id);
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
        showNotification('Produit supprimé avec succès');
      } else {
        showNotification('Impossible de supprimer le produit', 'error');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      showNotification('Erreur serveur', 'error');
    } finally {
      setIsDeleting(null);
    }
  };

  // Filtrage côté client pour la recherche instantanée
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-6 md:p-10 font-sans">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-slideInRight">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm ${
            toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/ironz-setup')}
              className="p-2 rounded-full bg-white border border-yellow-200 hover:bg-yellow-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-yellow-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
              <p className="text-gray-500 mt-1">Inventaire total : {products.length} articles</p>
            </div>
          </div>
          
          <Link 
            href="/ironz-setup" 
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Ajouter un produit
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher (Nom, SKU)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-yellow-500 outline-none cursor-pointer bg-white appearance-none min-w-[200px]"
              >
                <option value="">Toutes les catégories</option>
                <option value="Equipements">Équipements</option>
                <option value="Supplément">Suppléments</option>
                <option value="Accessoires">Accessoires</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-96 gap-4">
              <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
              <p className="text-gray-500 font-medium">Chargement du catalogue...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-gray-500">
              <div className="p-4 bg-gray-50 rounded-full mb-4">
                <Package className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Aucun produit trouvé</h3>
              <p>Modifiez vos filtres ou ajoutez un nouveau produit.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Produit</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Catégorie</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Prix</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-yellow-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-white overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm relative">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                <Package className="w-6 h-6 text-gray-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 line-clamp-1">{product.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-gray-500 font-mono bg-gray-100 px-1.5 py-0.5 rounded">{product.sku || 'No SKU'}</p>
                                {product.isNewProduct && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">NEW</span>}
                                {product.isFeatured && <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">STAR</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          product.category === 'Equipements' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          product.category === 'Supplément' ? 'bg-green-50 text-green-700 border-green-100' :
                          'bg-purple-50 text-purple-700 border-purple-100'
                        }`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{formatPrice(product.price)}</div>
                        {product.discount > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">-{product.discount}%</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {product.inStock ? (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                              <span className="text-sm font-medium text-emerald-700">En stock</span>
                            </div>
                            <span className="text-xs text-gray-500 pl-3.5">{product.stockQuantity} unités</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-sm text-red-600 font-medium">Rupture</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/ironz-setup/products/edit/${product._id}`}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            disabled={isDeleting === product._id}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                            title="Supprimer"
                          >
                            {isDeleting === product._id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
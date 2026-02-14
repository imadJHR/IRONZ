'use client';

import { useState, useEffect, useMemo } from 'react';
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
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RefreshCw,
  Star
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://m3cznnxb6ipf6oqi2kmfqsqqma0rsiaz.lambda-url.eu-north-1.on.aws/api';

export default function ProductListPage() {
  const router = useRouter();
  
  // Data State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Action State
  const [isDeleting, setIsDeleting] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Initial Fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, itemsPerPage]);

  const showNotification = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      let allProducts = [];
      let page = 1;
      let hasMore = true;
      const batchLimit = 50; 

      // Loop to fetch all pages to get Exact Total
      while (hasMore) {
        const url = `${API_URL}/products?page=${page}&limit=${batchLimit}&sort=newest`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success && Array.isArray(data.data)) {
          const newItems = data.data;
          
          if (newItems.length === 0) {
            hasMore = false;
            break;
          }

          allProducts = [...allProducts, ...newItems];

          if (newItems.length < batchLimit) {
            hasMore = false;
          } else {
            page++;
          }
        } else {
          hasMore = false;
          if (page === 1) showNotification('Erreur de chargement', 'error');
        }
      }

      // Remove duplicates
      const uniqueProducts = Array.from(new Map(allProducts.map(item => [item._id, item])).values());
      setProducts(uniqueProducts);

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
        setProducts(prev => prev.filter(p => p._id !== id));
        showNotification('Produit supprimé avec succès');
        
        if (paginatedProducts.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
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

  // --- Filtering & Pagination Logic ---

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  const totalItems = filteredProducts.length;
  const totalInventory = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(price);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-slideInRight">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm ${
            toast.type === 'success' 
              ? 'bg-black text-white border border-yellow-500' 
              : 'bg-red-600 text-white'
          }`}>
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5 text-yellow-400" /> : <AlertCircle className="w-5 h-5" />}
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
              className="p-2 rounded-full bg-white border border-gray-200 hover:border-yellow-400 hover:text-yellow-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
              <div className="flex items-center gap-2 mt-1">
                {loading ? (
                   <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <p className="text-gray-500">
                    Inventaire total : <span className="font-bold text-yellow-600">{totalInventory}</span> articles
                  </p>
                )}
                <button 
                  onClick={fetchProducts} 
                  disabled={loading}
                  className="p-1 text-gray-400 hover:text-yellow-600 transition-colors disabled:opacity-50"
                  title="Rafraîchir"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
          
          <Link 
            href="/ironz-setup" 
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-black rounded-xl font-bold shadow-lg hover:bg-yellow-400 hover:shadow-xl hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Ajouter un produit
          </Link>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col min-h-[600px]">
          {loading ? (
            <div className="flex-1 flex flex-col justify-center items-center gap-4">
              <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
              <p className="text-gray-500 font-medium">Récupération de tous les produits...</p>
              <p className="text-xs text-gray-400">Cela peut prendre quelques secondes</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Aucun produit trouvé</h3>
              <p>
                {searchTerm || categoryFilter 
                  ? "Aucun résultat pour vos filtres." 
                  : "Commencez par ajouter votre premier produit."}
              </p>
              {searchTerm || categoryFilter ? (
                <button 
                  onClick={() => {setSearchTerm(''); setCategoryFilter('');}}
                  className="mt-4 text-yellow-600 font-medium hover:underline"
                >
                  Effacer les filtres
                </button>
              ) : null}
            </div>
          ) : (
            <>
              {/* Table Content */}
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Produit</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Catégorie</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Prix</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-yellow-50/20 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200 relative">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <Package className="w-6 h-6 text-gray-300" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 line-clamp-1">{product.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                  <p className="text-xs text-gray-500 font-mono bg-gray-100 px-1.5 py-0.5 rounded">{product.sku || 'No SKU'}</p>
                                  {product.isNewProduct && <span className="text-[10px] font-bold text-black bg-yellow-400 px-1.5 py-0.5 rounded">NEW</span>}
                                  {product.isFeatured && (
                                    <span className="text-[10px] font-bold text-white bg-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                      <Star className="w-2 h-2 fill-white" /> STAR
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-black text-yellow-400 border border-gray-900">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{formatPrice(product.price)}</div>
                          {product.discount > 0 && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                              <span className="text-[10px] font-bold text-white bg-red-600 px-1.5 py-0.5 rounded">-{product.discount}%</span>
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
                              className="p-2 text-gray-500 hover:text-black hover:bg-yellow-100 rounded-lg transition-all"
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

              {/* Pagination Footer */}
              <div className="border-t border-gray-200 bg-gray-50/50 p-4 rounded-b-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  
                  {/* Left: Items per page & Count */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>Afficher</span>
                      <select 
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="bg-white border border-gray-200 rounded-lg text-sm py-1 px-2 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                      <span>par page</span>
                    </div>
                    <span className="hidden md:inline text-gray-300">|</span>
                    <span className="font-medium">
                      {totalItems > 0 ? `${startIndex + 1}-${endIndex}` : '0'} sur {totalItems} produits filtrés
                    </span>
                  </div>

                  {/* Right: Navigation Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      title="Première page"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      title="Page précédente"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1 mx-2">
                      {getPageNumbers().map((page, idx) => (
                        page === '...' ? (
                          <span key={`dots-${idx}`} className="px-2 text-gray-400">...</span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                              currentPage === page
                                ? 'bg-yellow-500 text-black shadow-md shadow-yellow-200'
                                : 'text-gray-600 hover:bg-white hover:shadow-sm'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      title="Page suivante"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                      title="Dernière page"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
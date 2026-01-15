// // src/pages/SearchResultsPage.jsx
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { productAPI } from '../utils/api';
// import { useFilters } from '../context/FilterContext';

// const SearchResultsPage = () => {
//     const { subCategoryId } = useParams();
//     const { filters, sortBy } = useFilters();

//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             setLoading(true);
//             try {
//                 const params = {
//                     subCategoryId,
//                     brands: filters.brands.length > 0 ? filters.brands : undefined,
//                     minPrice: filters.priceRange[0],
//                     maxPrice: filters.priceRange[1],
//                     minRating: filters.rating,
//                     storage: filters.storage.length > 0 ? filters.storage : undefined,
//                     ram: filters.ram.length > 0 ? filters.ram : undefined,
//                     sizes: filters.sizes.length > 0 ? filters.sizes : undefined,
//                     colors: filters.colors.length > 0 ? filters.colors : undefined,
//                     sortBy,
//                     page: 0,
//                     size: 20
//                 };

//                 const response = await productAPI.getProducts(params);
//                 setProducts(response.data.products || []);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (subCategoryId) {
//             fetchProducts();
//         }
//     }, [subCategoryId, filters, sortBy]);

//     return (
//         <div className="p-4">
//             <h1 className="text-xl font-bold mb-4">Products</h1>

//             {loading && <p>Loading...</p>}

//             {!loading && products.length === 0 && (
//                 <p>No products found</p>
//             )}

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {products.map((product) => (
//                     <div
//                         key={product.id}
//                         className="border rounded p-3"
//                     >
//                         <h2 className="font-semibold">{product.name}</h2>
//                         <p className="text-sm">{product.brand}</p>
//                         <p className="font-bold">₹{product.price}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SearchResultsPage;


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import FilterSidebar from '../components/filters/FilterSideBar';
import ProductCard from '../components/products/ProductCard';
import ProductModal from '../components/products/ProductModal';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const SearchResultsPage = () => {
    const { categoryId, subCategoryId } = useParams();
    const navigate = useNavigate();

    // State
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        brands: [],
        priceRange: [0, 200000],
        rating: 0,
        storage: [],
        ram: [],
        sizes: [],
        colors: []
    });
    const [sortBy, setSortBy] = useState('relevance');
    const [totalProducts, setTotalProducts] = useState(0);

    // Category configurations
    const categoryConfig = {
        'mobile-phones': {
            name: 'Mobile Phones',
            category: 'Electronics',
            validKeywords: ['iphone', 'samsung', 'oneplus', 'xiaomi', 'google', 'pixel', 'smartphone', 'mobile', 'phone'],
            invalidKeywords: ['laptop', 'macbook', 'dell', 'hp', 'shirt', 'dress', 'jeans']
        },
        'laptops': {
            name: 'Laptops',
            category: 'Electronics',
            validKeywords: ['macbook', 'dell', 'hp', 'lenovo', 'asus', 'laptop', 'notebook', 'thinkpad'],
            invalidKeywords: ['iphone', 'samsung', 'mobile', 'phone', 'shirt', 'dress', 'jeans']
        },
        'mens-wear': {
            name: "Men's Wear",
            category: 'Clothes',
            validKeywords: ['shirt', 'jeans', 'jacket', 'tshirt', 't-shirt', 'trousers', 'polo', 'men'],
            invalidKeywords: ['iphone', 'laptop', 'mobile', 'dress', 'kurti', 'saree']
        },
        'womens-wear': {
            name: "Women's Wear",
            category: 'Clothes',
            validKeywords: ['dress', 'top', 'skirt', 'saree', 'kurti', 'blouse', 'gown', 'women'],
            invalidKeywords: ['iphone', 'laptop', 'mobile', 'shirt', 'jeans', 'jacket']
        }
    };

    const currentConfig = categoryConfig[subCategoryId];

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = {
                    subCategoryId,
                    brands: filters.brands.length > 0 ? filters.brands.join(',') : undefined,
                    minPrice: filters.priceRange[0],
                    maxPrice: filters.priceRange[1],
                    minRating: filters.rating || undefined,
                    storage: filters.storage.length > 0 ? filters.storage.join(',') : undefined,
                    ram: filters.ram.length > 0 ? filters.ram.join(',') : undefined,
                    sizes: filters.sizes.length > 0 ? filters.sizes.join(',') : undefined,
                    colors: filters.colors.length > 0 ? filters.colors.join(',') : undefined,
                    search: searchQuery || undefined,
                    sortBy: sortBy,
                    page: 0,
                    size: 20
                };

                // Remove undefined params
                Object.keys(params).forEach(key =>
                    params[key] === undefined && delete params[key]
                );

                console.log('Fetching products with params:', params);

                const response = await axios.get(`${API_BASE_URL}/products`, { params });

                setProducts(response.data.products || []);
                setTotalProducts(response.data.totalProducts || 0);
            } catch (error) {
                console.error('Error fetching products:', error);
                alert('Error loading products. Please check if backend is running on port 8080.');
            } finally {
                setLoading(false);
            }
        };

        if (subCategoryId) {
            fetchProducts();
        }
    }, [subCategoryId, filters, searchQuery, sortBy]);

    // Handle search validation
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.search.value;

        if (!query.trim()) {
            setSearchQuery('');
            return;
        }

        const queryLower = query.toLowerCase();

        // Check if search contains invalid keywords
        const hasInvalidKeyword = currentConfig.invalidKeywords.some(keyword =>
            queryLower.includes(keyword)
        );

        if (hasInvalidKeyword) {
            alert(
                `❌ Invalid Search!\n\nYou're searching for "${query}" in ${currentConfig.name}.\n\n` +
                `Valid searches: ${currentConfig.validKeywords.join(', ')}`
            );
            return;
        }

        setSearchQuery(query);
    };

    return (
        <div className="min-h-screen bg-dark-bg">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-dark-textSecondary mb-6">
                    <span
                        onClick={() => navigate('/')}
                        className="hover:text-dark-text cursor-pointer"
                    >
                        Home
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span
                        onClick={() => navigate(`/category/${categoryId}`)}
                        className="hover:text-dark-text cursor-pointer"
                    >
                        {currentConfig?.category}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-dark-text">{currentConfig?.name}</span>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            name="search"
                            placeholder={`Search in ${currentConfig?.name}...`}
                            className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-dark-text placeholder-dark-textSecondary focus:outline-none focus:border-primary-blue"
                        />
                    </form>
                </div>

                {/* Results Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-dark-text">
                        {loading ? 'Loading...' : `${totalProducts} Results`}
                    </h2>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-dark-text focus:outline-none focus:border-primary-blue cursor-pointer"
                    >
                        <option value="relevance">Sort by: Relevance</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Customer Rating</option>
                    </select>
                </div>

                {/* Main Layout: Filters + Products */}
                <div className="flex gap-6">
                    {/* Filters Sidebar */}
                    <div className="w-64 flex-shrink-0">
                        <FilterSidebar
                            categoryId={categoryId}
                            subCategoryId={subCategoryId}
                            filters={filters}
                            onFilterChange={setFilters}
                        />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="text-center py-20">
                                <p className="text-xl text-dark-textSecondary">Loading products...</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-xl text-dark-textSecondary">No products found</p>
                                <button
                                    onClick={() => {
                                        setFilters({
                                            brands: [],
                                            priceRange: [0, 200000],
                                            rating: 0,
                                            storage: [],
                                            ram: [],
                                            sizes: [],
                                            colors: []
                                        });
                                        setSearchQuery('');
                                    }}
                                    className="mt-4 px-6 py-2 bg-primary-blue hover:bg-primary-blueHover text-white rounded-lg"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onClick={() => setSelectedProduct(product)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default SearchResultsPage;
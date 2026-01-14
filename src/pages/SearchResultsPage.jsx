import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Star, X } from 'lucide-react';
import FilterSidebar from '../components/filters/FilterSideBar';
import ProductCard from '../components/products/ProductCard';
import ProductModal from '../components/products/ProductModal';

const SearchResultsPage = () => {
    const { categoryId, subCategoryId } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
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

    // Dummy product data
    const productData = {
        'mobile-phones': [
            {
                id: 1,
                name: 'iPhone 15 Pro Max',
                brand: 'Apple',
                price: 159900,
                rating: 4.8,
                reviews: 1250,
                image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
                specs: { storage: '256GB', ram: '8GB', color: 'Titanium Blue' },
                inStock: true
            },
            {
                id: 2,
                name: 'Samsung Galaxy S24 Ultra',
                brand: 'Samsung',
                price: 134999,
                rating: 4.7,
                reviews: 980,
                image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
                specs: { storage: '512GB', ram: '12GB', color: 'Phantom Black' },
                inStock: true
            },
            {
                id: 3,
                name: 'OnePlus 12',
                brand: 'OnePlus',
                price: 64999,
                rating: 4.6,
                reviews: 756,
                image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
                specs: { storage: '256GB', ram: '16GB', color: 'Flowy Emerald' },
                inStock: true
            },
            {
                id: 4,
                name: 'Google Pixel 8 Pro',
                brand: 'Google',
                price: 106999,
                rating: 4.5,
                reviews: 542,
                image: 'https://images.unsplash.com/photo-1598328893441-45f3fe7cb7ff?w=400',
                specs: { storage: '128GB', ram: '12GB', color: 'Bay Blue' },
                inStock: true
            },
            {
                id: 5,
                name: 'Xiaomi 14 Pro',
                brand: 'Xiaomi',
                price: 79999,
                rating: 4.4,
                reviews: 623,
                image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
                specs: { storage: '512GB', ram: '12GB', color: 'Titanium' },
                inStock: true
            }
        ],
        'laptops': [
            {
                id: 6,
                name: 'MacBook Pro 16"',
                brand: 'Apple',
                price: 249900,
                rating: 4.9,
                reviews: 2100,
                image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
                specs: { storage: '1TB SSD', ram: '32GB', color: 'Space Gray' },
                inStock: true
            },
            {
                id: 7,
                name: 'Dell XPS 15',
                brand: 'Dell',
                price: 189990,
                rating: 4.7,
                reviews: 1450,
                image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
                specs: { storage: '512GB SSD', ram: '16GB', color: 'Platinum Silver' },
                inStock: true
            },
            {
                id: 8,
                name: 'HP Spectre x360',
                brand: 'HP',
                price: 134990,
                rating: 4.6,
                reviews: 890,
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
                specs: { storage: '512GB SSD', ram: '16GB', color: 'Nightfall Black' },
                inStock: true
            },
            {
                id: 9,
                name: 'Lenovo ThinkPad X1 Carbon',
                brand: 'Lenovo',
                price: 159990,
                rating: 4.8,
                reviews: 1120,
                image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400',
                specs: { storage: '1TB SSD', ram: '32GB', color: 'Black' },
                inStock: true
            },
            {
                id: 10,
                name: 'ASUS ROG Zephyrus G14',
                brand: 'ASUS',
                price: 169990,
                rating: 4.7,
                reviews: 756,
                image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
                specs: { storage: '1TB SSD', ram: '16GB', color: 'Moonlight White' },
                inStock: true
            }
        ],
        'mens-wear': [
            {
                id: 11,
                name: 'Classic Fit Oxford Shirt',
                brand: 'Nike',
                price: 2499,
                rating: 4.3,
                reviews: 450,
                image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400',
                specs: { size: 'L', color: 'White' },
                inStock: true
            },
            {
                id: 12,
                name: 'Slim Fit Denim Jeans',
                brand: "Levi's",
                price: 3999,
                rating: 4.5,
                reviews: 890,
                image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
                specs: { size: 'M', color: 'Dark Blue' },
                inStock: true
            },
            {
                id: 13,
                name: 'Cotton Polo T-Shirt',
                brand: 'Adidas',
                price: 1799,
                rating: 4.4,
                reviews: 670,
                image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400',
                specs: { size: 'XL', color: 'Navy Blue' },
                inStock: true
            },
            {
                id: 14,
                name: 'Leather Jacket',
                brand: 'Zara',
                price: 8999,
                rating: 4.6,
                reviews: 340,
                image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
                specs: { size: 'L', color: 'Black' },
                inStock: true
            }
        ],
        'womens-wear': [
            {
                id: 15,
                name: 'Floral Summer Dress',
                brand: 'H&M',
                price: 2999,
                rating: 4.5,
                reviews: 780,
                image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
                specs: { size: 'M', color: 'Floral Print' },
                inStock: true
            },
            {
                id: 16,
                name: 'Silk Evening Gown',
                brand: 'Zara',
                price: 7999,
                rating: 4.7,
                reviews: 450,
                image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400',
                specs: { size: 'S', color: 'Emerald Green' },
                inStock: true
            },
            {
                id: 17,
                name: 'Casual Top',
                brand: 'Forever 21',
                price: 1499,
                rating: 4.2,
                reviews: 620,
                image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400',
                specs: { size: 'L', color: 'Pink' },
                inStock: true
            },
            {
                id: 18,
                name: 'Designer Kurti',
                brand: 'Fabindia',
                price: 3499,
                rating: 4.6,
                reviews: 890,
                image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400',
                specs: { size: 'M', color: 'Royal Blue' },
                inStock: true
            }
        ]
    };

    // Get current products
    const currentProducts = productData[subCategoryId] || [];

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

    // Filter products based on filters and search
    const filteredProducts = currentProducts.filter(product => {
        // Brand filter
        if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
            return false;
        }

        // Price filter
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
            return false;
        }

        // Rating filter
        if (product.rating < filters.rating) {
            return false;
        }

        // Storage filter (for electronics)
        if (filters.storage.length > 0) {
            const hasStorage = filters.storage.some(s => product.specs.storage?.includes(s));
            if (!hasStorage) return false;
        }

        // RAM filter (for electronics)
        if (filters.ram.length > 0) {
            const hasRAM = filters.ram.some(r => product.specs.ram?.includes(r));
            if (!hasRAM) return false;
        }

        // Size filter (for clothes)
        if (filters.sizes.length > 0 && !filters.sizes.includes(product.specs.size)) {
            return false;
        }

        // Color filter
        if (filters.colors.length > 0) {
            const hasColor = filters.colors.some(c =>
                product.specs.color?.toLowerCase().includes(c.toLowerCase())
            );
            if (!hasColor) return false;
        }

        // Search query filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                product.name.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query)
            );
        }

        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    // Handle search validation
    const handleSearch = (query) => {
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
        <div className="flex gap-6">
            {/* Sidebar Filters */}
            <div className="w-64 shrink-0">
                <FilterSidebar
                    categoryId={categoryId}
                    subCategoryId={subCategoryId}
                    filters={filters}
                    onFilterChange={setFilters}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-dark-textSecondary mb-6">
                    <span onClick={() => navigate('/')} className="hover:text-dark-text cursor-pointer">
                        Home
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span onClick={() => navigate(`/category/${categoryId}`)} className="hover:text-dark-text cursor-pointer">
                        {currentConfig?.category}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-dark-text">{currentConfig?.name}</span>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <form onSubmit={(e) => { e.preventDefault(); handleSearch(e.target.search.value); }}>
                        <input
                            type="text"
                            name="search"
                            placeholder={`Search in ${currentConfig?.name}...`}
                            className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-dark-text focus:outline-none focus:border-primary-blue"
                        />
                    </form>
                </div>

                {/* Results Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-dark-text">
                        {sortedProducts.length} Results
                    </h2>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-dark-text focus:outline-none focus:border-primary-blue"
                    >
                        <option value="relevance">Sort by: Relevance</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Customer Rating</option>
                    </select>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => setSelectedProduct(product)}
                        />
                    ))}
                </div>

                {/* No Results */}
                {sortedProducts.length === 0 && (
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
                )}
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
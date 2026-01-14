import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductList = ({ currentPage, setCurrentPage, totalProducts, productsPerPage, categoryId, subCategoryId }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Category-specific mock products
    const productsByCategory = {
        electronics: {
            'mobile-phones': [
                {
                    id: 1, name: 'iPhone 13 Pro', brand: 'Apple', seller: 'Inagur Guras',
                    price: 119900, originalPrice: 139900, discount: 14, rating: 4.5, reviews: 1109,
                    storage: '256GB', ram: '6GB', color: 'Black', inStock: true, category: 'mobile'
                },
                {
                    id: 2, name: 'iPhone 13', brand: 'Apple', seller: 'Inagur Guras',
                    price: 69990, originalPrice: 79990, discount: 12, rating: 4.7, reviews: 1205,
                    storage: '128GB', ram: '4GB', color: 'Blue', inStock: true, category: 'mobile'
                },
                {
                    id: 3, name: 'Samsung Galaxy S21', brand: 'Samsung', seller: 'TechStore',
                    price: 54990, originalPrice: 69990, discount: 21, rating: 4.4, reviews: 756,
                    storage: '128GB', ram: '8GB', color: 'Black', inStock: true, category: 'mobile'
                },
                {
                    id: 4, name: 'OnePlus 9 Pro', brand: 'OnePlus', seller: 'OnePlus Store',
                    price: 49999, originalPrice: 64999, discount: 23, rating: 4.5, reviews: 892,
                    storage: '256GB', ram: '12GB', color: 'Green', inStock: true, category: 'mobile'
                },
            ],
            laptops: [
                {
                    id: 11, name: 'MacBook Pro 14"', brand: 'Apple', seller: 'Apple Store',
                    price: 194900, originalPrice: 209900, discount: 7, rating: 4.8, reviews: 892,
                    storage: '512GB SSD', ram: '16GB', color: 'Space Gray', inStock: true, category: 'laptop'
                },
                {
                    id: 12, name: 'Dell XPS 15', brand: 'Dell', seller: 'Dell Official',
                    price: 149900, originalPrice: 169900, discount: 12, rating: 4.6, reviews: 654,
                    storage: '1TB SSD', ram: '32GB', color: 'Silver', inStock: true, category: 'laptop'
                },
                {
                    id: 13, name: 'HP Pavilion Gaming', brand: 'HP', seller: 'HP Store',
                    price: 79990, originalPrice: 94990, discount: 16, rating: 4.3, reviews: 543,
                    storage: '512GB SSD', ram: '16GB', color: 'Black', inStock: true, category: 'laptop'
                },
                {
                    id: 14, name: 'Lenovo ThinkPad X1', brand: 'Lenovo', seller: 'Lenovo Official',
                    price: 129900, originalPrice: 149900, discount: 13, rating: 4.7, reviews: 432,
                    storage: '1TB SSD', ram: '16GB', color: 'Black', inStock: true, category: 'laptop'
                },
            ],
        },
        clothes: {
            'mens-wear': [
                {
                    id: 21, name: 'Classic Fit Shirt', brand: 'Nike', seller: 'Nike Store',
                    price: 1999, originalPrice: 2999, discount: 33, rating: 4.2, reviews: 234,
                    size: 'M', color: 'Blue', inStock: true, category: 'mens-wear'
                },
                {
                    id: 22, name: 'Slim Fit Jeans', brand: "Levi's", seller: "Levi's Official",
                    price: 2499, originalPrice: 3499, discount: 29, rating: 4.5, reviews: 456,
                    size: 'L', color: 'Black', inStock: true, category: 'mens-wear'
                },
                {
                    id: 23, name: 'Sports T-Shirt', brand: 'Adidas', seller: 'Adidas Store',
                    price: 1299, originalPrice: 1799, discount: 28, rating: 4.3, reviews: 189,
                    size: 'L', color: 'White', inStock: true, category: 'mens-wear'
                },
                {
                    id: 24, name: 'Casual Jacket', brand: 'Puma', seller: 'Puma Official',
                    price: 3999, originalPrice: 5999, discount: 33, rating: 4.6, reviews: 321,
                    size: 'XL', color: 'Gray', inStock: true, category: 'mens-wear'
                },
            ],
            'womens-wear': [
                {
                    id: 31, name: 'Floral Summer Dress', brand: 'Zara', seller: 'Zara Store',
                    price: 2999, originalPrice: 4499, discount: 33, rating: 4.7, reviews: 543,
                    size: 'M', color: 'Red', inStock: true, category: 'womens-wear'
                },
                {
                    id: 32, name: 'Casual Top', brand: 'H&M', seller: 'H&M Official',
                    price: 1499, originalPrice: 1999, discount: 25, rating: 4.4, reviews: 234,
                    size: 'S', color: 'White', inStock: true, category: 'womens-wear'
                },
                {
                    id: 33, name: 'Denim Skirt', brand: 'Forever 21', seller: 'Forever 21 Store',
                    price: 1799, originalPrice: 2499, discount: 28, rating: 4.3, reviews: 198,
                    size: 'M', color: 'Blue', inStock: true, category: 'womens-wear'
                },
                {
                    id: 34, name: 'Evening Gown', brand: 'Mango', seller: 'Mango Official',
                    price: 5999, originalPrice: 8999, discount: 33, rating: 4.8, reviews: 432,
                    size: 'L', color: 'Black', inStock: true, category: 'womens-wear'
                },
            ],
        },
    };

    const mockProducts = productsByCategory[categoryId]?.[subCategoryId] || [];
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisible = 7;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div>
            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-4 mb-6">
                {mockProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={() => setSelectedProduct(product)}
                        categoryId={categoryId}
                        subCategoryId={subCategoryId}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-dark-card border border-dark-border hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-5 h-5 text-dark-text" />
                </button>

                {renderPagination().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={page === '...'}
                        className={`min-w-10 h-10 rounded-lg border ${page === currentPage
                            ? 'bg-primary-blue border-primary-blue text-white'
                            : 'bg-dark-card border-dark-border text-dark-text hover:bg-dark-hover'
                            } ${page === '...' ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-dark-card border border-dark-border hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-5 h-5 text-dark-text" />
                </button>
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

export default ProductList;
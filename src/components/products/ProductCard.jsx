import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-dark-card rounded-lg border border-dark-border hover:border-primary-blue transition-all cursor-pointer p-4 group"
        >
            {/* Product Image */}
            <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-800">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                {product.inStock && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        In Stock
                    </span>
                )}
            </div>

            {/* Product Info */}
            <div>
                <p className="text-xs text-dark-textSecondary mb-1">{product.brand}</p>
                <h3 className="text-dark-text font-semibold mb-2 line-clamp-2 group-hover:text-primary-blue transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
                        <span>{product.rating}</span>
                        <Star className="w-3 h-3 fill-current" />
                    </div>
                    <span className="text-xs text-dark-textSecondary">
                        ({product.reviews})
                    </span>
                </div>

                {/* Specs */}
                <div className="text-xs text-dark-textSecondary mb-3 space-y-1">
                    {product.specs.storage && <p>• {product.specs.storage}</p>}
                    {product.specs.ram && <p>• {product.specs.ram}</p>}
                    {product.specs.size && <p>• Size: {product.specs.size}</p>}
                    <p>• {product.specs.color}</p>
                </div>

                {/* Price and Cart */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-dark-text">
                            ₹{product.price.toLocaleString()}
                        </p>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            alert('Added to cart!');
                        }}
                        className="p-2 bg-primary-blue hover:bg-primary-blueHover text-white rounded-lg transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
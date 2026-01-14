import { X, Star, ShoppingCart, Heart } from 'lucide-react';

const ProductModal = ({ product, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-dark-border">
                    <h2 className="text-2xl font-bold text-dark-text">Product Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-dark-bgSecondary rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-dark-textSecondary" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image */}
                        <div>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </div>

                        {/* Details */}
                        <div>
                            <p className="text-sm text-dark-textSecondary mb-2">{product.brand}</p>
                            <h3 className="text-3xl font-bold text-dark-text mb-4">{product.name}</h3>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded">
                                    <span className="font-semibold">{product.rating}</span>
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                                <span className="text-dark-textSecondary">
                                    {product.reviews} ratings
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <p className="text-4xl font-bold text-dark-text mb-2">
                                    ₹{product.price.toLocaleString()}
                                </p>
                                <p className="text-sm text-green-500">Inclusive of all taxes</p>
                            </div>

                            {/* Specs */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-dark-text mb-3">Specifications:</h4>
                                <div className="space-y-2">
                                    {product.specs.storage && (
                                        <div className="flex justify-between py-2 border-b border-dark-border">
                                            <span className="text-dark-textSecondary">Storage</span>
                                            <span className="text-dark-text font-medium">{product.specs.storage}</span>
                                        </div>
                                    )}
                                    {product.specs.ram && (
                                        <div className="flex justify-between py-2 border-b border-dark-border">
                                            <span className="text-dark-textSecondary">RAM</span>
                                            <span className="text-dark-text font-medium">{product.specs.ram}</span>
                                        </div>
                                    )}
                                    {product.specs.size && (
                                        <div className="flex justify-between py-2 border-b border-dark-border">
                                            <span className="text-dark-textSecondary">Size</span>
                                            <span className="text-dark-text font-medium">{product.specs.size}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between py-2 border-b border-dark-border">
                                        <span className="text-dark-textSecondary">Color</span>
                                        <span className="text-dark-text font-medium">{product.specs.color}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-dark-textSecondary">Availability</span>
                                        <span className="text-green-500 font-medium">
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => alert('Added to cart!')}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-blue hover:bg-primary-blueHover text-white rounded-lg transition-colors font-semibold"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => alert('Added to wishlist!')}
                                    className="p-3 border border-dark-border hover:border-primary-blue hover:bg-dark-bgSecondary rounded-lg transition-colors"
                                >
                                    <Heart className="w-6 h-6 text-dark-textSecondary" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
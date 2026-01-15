import { useState } from 'react';
import PriceFilter from './PriceFilter';


const FilterSidebar = ({ categoryId, subCategoryId, filters, onFilterChange }) => {
    const isElectronics = categoryId === 'electronics';
    const isClothes = categoryId === 'clothes';

    // Brand options based on subcategory
    const brandOptions = {
        'mobile-phones': ['Apple', 'Samsung', 'OnePlus', 'Google', 'Xiaomi'],
        'laptops': ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS'],
        'mens-wear': ['Nike', 'Adidas', "Levi's", 'Zara'],
        'womens-wear': ['H&M', 'Zara', 'Forever 21', 'Fabindia']
    };

    const brands = brandOptions[subCategoryId] || [];

    const handleBrandChange = (brand) => {
        const newBrands = filters.brands.includes(brand)
            ? filters.brands.filter(b => b !== brand)
            : [...filters.brands, brand];
        onFilterChange({ ...filters, brands: newBrands });
    };

    const handlePriceChange = (e, index) => {
        const newRange = [...filters.priceRange];
        newRange[index] = parseInt(e.target.value);
        onFilterChange({ ...filters, priceRange: newRange });
    };

    return (
        <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
            <h3 className="text-lg font-bold text-dark-text mb-4">Filters</h3>

            {/* Brand Filter */}
            <div className="mb-6">
                <h4 className="font-semibold text-dark-text mb-3">Brand</h4>
                {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 mb-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                            className="w-4 h-4"
                        />
                        <span className="text-dark-textSecondary">{brand}</span>
                    </label>
                ))}
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-semibold text-dark-text mb-3">Price Range</h4>
                <div className="space-y-2">
                    <input
                        type="range"
                        min="0"
                        max="200000"
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-dark-textSecondary">
                        <span>₹{filters.priceRange[0]}</span>
                        <span>₹{filters.priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
                <h4 className="font-semibold text-dark-text mb-3">Customer Rating</h4>
                {[4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center gap-2 mb-2 cursor-pointer">
                        <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === rating}
                            onChange={() => onFilterChange({ ...filters, rating })}
                            className="w-4 h-4"
                        />
                        <span className="text-dark-textSecondary">{rating}★ & above</span>
                    </label>
                ))}
            </div>

            {/* Electronics Filters */}
            {isElectronics && (
                <>
                    {/* Storage */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-dark-text mb-3">Storage</h4>
                        {['128GB', '256GB', '512GB', '1TB'].map(storage => (
                            <label key={storage} className="flex items-center gap-2 mb-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.storage.includes(storage)}
                                    onChange={() => {
                                        const newStorage = filters.storage.includes(storage)
                                            ? filters.storage.filter(s => s !== storage)
                                            : [...filters.storage, storage];
                                        onFilterChange({ ...filters, storage: newStorage });
                                    }}
                                    className="w-4 h-4"
                                />
                                <span className="text-dark-textSecondary">{storage}</span>
                            </label>
                        ))}
                    </div>

                    {/* RAM */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-dark-text mb-3">RAM</h4>
                        {['8GB', '12GB', '16GB', '32GB'].map(ram => (
                            <label key={ram} className="flex items-center gap-2 mb-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.ram.includes(ram)}
                                    onChange={() => {
                                        const newRAM = filters.ram.includes(ram)
                                            ? filters.ram.filter(r => r !== ram)
                                            : [...filters.ram, ram];
                                        onFilterChange({ ...filters, ram: newRAM });
                                    }}
                                    className="w-4 h-4"
                                />
                                <span className="text-dark-textSecondary">{ram}</span>
                            </label>
                        ))}
                    </div>
                </>
            )}

            {/* Clothes Filters */}
            {isClothes && (
                <div className="mb-6">
                    <h4 className="font-semibold text-dark-text mb-3">Size</h4>
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <label key={size} className="flex items-center gap-2 mb-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.sizes.includes(size)}
                                onChange={() => {
                                    const newSizes = filters.sizes.includes(size)
                                        ? filters.sizes.filter(s => s !== size)
                                        : [...filters.sizes, size];
                                    onFilterChange({ ...filters, sizes: newSizes });
                                }}
                                className="w-4 h-4"
                            />
                            <span className="text-dark-textSecondary">{size}</span>
                        </label>
                    ))}
                </div>
            )}

            {/* Clear Filters */}
            <button
                onClick={() => onFilterChange({
                    brands: [],
                    priceRange: [0, 200000],
                    rating: 0,
                    storage: [],
                    ram: [],
                    sizes: [],
                    colors: []
                })}
                className="w-full px-4 py-2 bg-dark-bgSecondary text-primary-blue border border-primary-blue rounded-lg hover:bg-primary-blue hover:text-white transition-colors"
            >
                Clear All
            </button>
        </div>
    );
};

export default FilterSidebar;
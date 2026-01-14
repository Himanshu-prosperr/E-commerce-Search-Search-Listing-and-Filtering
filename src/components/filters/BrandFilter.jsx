import { useState } from 'react';
import { useFilters } from '../../context/FilterContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const BrandFilter = ({ categoryId, subCategoryId }) => {
    const { filters, toggleArrayFilter } = useFilters();
    const [isExpanded, setIsExpanded] = useState(true);

    // Category-specific brands
    const brandsByCategory = {
        electronics: {
            'mobile-phones': [
                { name: 'Apple', count: 89 },
                { name: 'Samsung', count: 67 },
                { name: 'OnePlus', count: 45 },
                { name: 'Xiaomi', count: 52 },
                { name: 'Google', count: 23 },
                { name: 'Realme', count: 38 },
            ],
            laptops: [
                { name: 'Apple', count: 45 },
                { name: 'Dell', count: 78 },
                { name: 'HP', count: 92 },
                { name: 'Lenovo', count: 65 },
                { name: 'Asus', count: 54 },
                { name: 'Acer', count: 38 },
            ],
        },
        clothes: {
            'mens-wear': [
                { name: 'Nike', count: 120 },
                { name: 'Adidas', count: 98 },
                { name: 'Puma', count: 75 },
                { name: 'Levi\'s', count: 85 },
                { name: 'H&M', count: 92 },
                { name: 'Zara', count: 67 },
            ],
            'womens-wear': [
                { name: 'Zara', count: 115 },
                { name: 'H&M', count: 102 },
                { name: 'Forever 21', count: 88 },
                { name: 'Mango', count: 76 },
                { name: 'Vero Moda', count: 65 },
                { name: 'Only', count: 54 },
            ],
        },
    };

    const brands = brandsByCategory[categoryId]?.[subCategoryId] || [];

    return (
        <div className="border-b border-dark-border pb-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full mb-3"
            >
                <h3 className="font-semibold text-dark-text">Brand</h3>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-dark-textSecondary" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-dark-textSecondary" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-2">
                    {brands.map((brand) => (
                        <label
                            key={brand.name}
                            className="flex items-center justify-between cursor-pointer hover:bg-dark-hover p-1 rounded"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={filters.brands.includes(brand.name)}
                                    onChange={() => toggleArrayFilter('brands', brand.name)}
                                    className="w-4 h-4 rounded border-dark-border text-primary-blue focus:ring-primary-blue focus:ring-offset-0 bg-dark-bg cursor-pointer"
                                />
                                <span className="text-sm text-dark-text">{brand.name}</span>
                            </div>
                            <span className="text-xs text-dark-textSecondary">{brand.count}+</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BrandFilter;
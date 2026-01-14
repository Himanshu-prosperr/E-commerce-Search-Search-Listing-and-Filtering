import { useState } from 'react';
import { useFilters } from '../../context/FilterContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PriceFilter = () => {
    const { filters, updateFilter } = useFilters();
    const [isExpanded, setIsExpanded] = useState(true);
    const [minPrice, setMinPrice] = useState(filters.priceRange[0]);
    const [maxPrice, setMaxPrice] = useState(filters.priceRange[1]);

    const MIN = 0;
    const MAX = 200000;

    const handleMinChange = (e) => {
        const value = parseInt(e.target.value);
        setMinPrice(value);
        if (value <= maxPrice) {
            updateFilter('priceRange', [value, maxPrice]);
        }
    };

    const handleMaxChange = (e) => {
        const value = parseInt(e.target.value);
        setMaxPrice(value);
        if (value >= minPrice) {
            updateFilter('priceRange', [minPrice, value]);
        }
    };

    const formatPrice = (price) => {
        return `₹${price.toLocaleString('en-IN')}`;
    };

    return (
        <div className="border-b border-dark-border pb-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full mb-3"
            >
                <h3 className="font-semibold text-dark-text">Price</h3>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-dark-textSecondary" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-dark-textSecondary" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-4">
                    {/* Price Range Display */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-textSecondary">Min</span>
                        <span className="text-dark-textSecondary">Max</span>
                    </div>

                    {/* Dual Range Slider */}
                    <div className="relative pt-2 pb-4">
                        <input
                            type="range"
                            min={MIN}
                            max={MAX}
                            step={1000}
                            value={minPrice}
                            onChange={handleMinChange}
                            className="absolute w-full pointer-events-auto"
                            style={{ zIndex: minPrice > MAX - 10000 ? 5 : 3 }}
                        />
                        <input
                            type="range"
                            min={MIN}
                            max={MAX}
                            step={1000}
                            value={maxPrice}
                            onChange={handleMaxChange}
                            className="absolute w-full pointer-events-auto"
                            style={{ zIndex: 4 }}
                        />
                    </div>

                    {/* Price Display */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 bg-dark-bg border border-dark-border rounded px-3 py-2">
                            <span className="text-sm text-dark-text">{formatPrice(minPrice)}</span>
                        </div>
                        <span className="text-dark-textSecondary">to</span>
                        <div className="flex-1 bg-dark-bg border border-dark-border rounded px-3 py-2">
                            <span className="text-sm text-dark-text">{formatPrice(maxPrice)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceFilter;
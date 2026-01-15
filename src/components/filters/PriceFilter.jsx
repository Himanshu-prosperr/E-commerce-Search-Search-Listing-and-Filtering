// import { useState } from 'react';
// import { useFilters } from '../../context/FilterContext';
// import { ChevronDown, ChevronUp } from 'lucide-react';

// const PriceFilter = () => {
//     const { filters, updateFilter } = useFilters();
//     const [isExpanded, setIsExpanded] = useState(true);
//     const [minPrice, setMinPrice] = useState(filters.priceRange[0]);
//     const [maxPrice, setMaxPrice] = useState(filters.priceRange[1]);

//     const MIN = 0;
//     const MAX = 200000;

//     const handleMinChange = (e) => {
//         const value = parseInt(e.target.value);
//         setMinPrice(value);
//         if (value <= maxPrice) {
//             updateFilter('priceRange', [value, maxPrice]);
//         }
//     };

//     const handleMaxChange = (e) => {
//         const value = parseInt(e.target.value);
//         setMaxPrice(value);
//         if (value >= minPrice) {
//             updateFilter('priceRange', [minPrice, value]);
//         }
//     };

//     const formatPrice = (price) => {
//         return `₹${price.toLocaleString('en-IN')}`;
//     };

//     return (
//         <div className="border-b border-dark-border pb-4">
//             <button
//                 onClick={() => setIsExpanded(!isExpanded)}
//                 className="flex items-center justify-between w-full mb-3"
//             >
//                 <h3 className="font-semibold text-dark-text">Price</h3>
//                 {isExpanded ? (
//                     <ChevronUp className="w-4 h-4 text-dark-textSecondary" />
//                 ) : (
//                     <ChevronDown className="w-4 h-4 text-dark-textSecondary" />
//                 )}
//             </button>

//             {isExpanded && (
//                 <div className="space-y-4">
//                     {/* Price Range Display */}
//                     <div className="flex items-center justify-between text-sm">
//                         <span className="text-dark-textSecondary">Min</span>
//                         <span className="text-dark-textSecondary">Max</span>
//                     </div>

//                     {/* Dual Range Slider */}
//                     <div className="relative pt-2 pb-4">
//                         <input
//                             type="range"
//                             min={MIN}
//                             max={MAX}
//                             step={1000}
//                             value={minPrice}
//                             onChange={handleMinChange}
//                             className="absolute w-full pointer-events-auto"
//                             style={{ zIndex: minPrice > MAX - 10000 ? 5 : 3 }}
//                         />
//                         <input
//                             type="range"
//                             min={MIN}
//                             max={MAX}
//                             step={1000}
//                             value={maxPrice}
//                             onChange={handleMaxChange}
//                             className="absolute w-full pointer-events-auto"
//                             style={{ zIndex: 4 }}
//                         />
//                     </div>

//                     {/* Price Display */}
//                     <div className="flex items-center justify-between gap-2">
//                         <div className="flex-1 bg-dark-bg border border-dark-border rounded px-3 py-2">
//                             <span className="text-sm text-dark-text">{formatPrice(minPrice)}</span>
//                         </div>
//                         <span className="text-dark-textSecondary">to</span>
//                         <div className="flex-1 bg-dark-bg border border-dark-border rounded px-3 py-2">
//                             <span className="text-sm text-dark-text">{formatPrice(maxPrice)}</span>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PriceFilter;

// src/components/filters/PriceFilter.jsx
import { useState, useEffect, useRef } from 'react';
import { useFilters } from '../../context/FilterContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PriceFilter = () => {
    const { filters, updateFilter } = useFilters();
    const [isExpanded, setIsExpanded] = useState(true);

    // Local values mirror context so UI is snappy
    const [minPrice, setMinPrice] = useState(filters.priceRange?.[0] ?? 0);
    const [maxPrice, setMaxPrice] = useState(filters.priceRange?.[1] ?? 200000);

    // constants
    const MIN = 0;
    const MAX = 200000;
    const STEP = 1000;

    // keep local state in sync if context changes externally
    useEffect(() => {
        setMinPrice(filters.priceRange?.[0] ?? MIN);
        setMaxPrice(filters.priceRange?.[1] ?? MAX);
    }, [filters.priceRange]);

    // helper to update context only when valid
    const setRange = (newMin, newMax) => {
        const nm = Math.max(MIN, Math.min(newMin, newMax));
        const nx = Math.min(MAX, Math.max(newMax, newMin));
        setMinPrice(nm);
        setMaxPrice(nx);
        updateFilter('priceRange', [nm, nx]);
    };

    const handleMinChange = (e) => {
        const val = parseInt(e.target.value || MIN, 10);
        // ensure min never exceeds max
        const newMin = Math.min(val, maxPrice);
        setRange(newMin, maxPrice);
    };

    const handleMaxChange = (e) => {
        const val = parseInt(e.target.value || MAX, 10);
        const newMax = Math.max(val, minPrice);
        setRange(minPrice, newMax);
    };

    const formatPrice = (p) => `₹${Number(p).toLocaleString('en-IN')}`;

    // percent positions for background fill
    const leftPercent = ((minPrice - MIN) / (MAX - MIN)) * 100;
    const rightPercent = ((maxPrice - MIN) / (MAX - MIN)) * 100;

    return (
        <div className="border-b border-dark-border pb-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full mb-3"
                aria-expanded={isExpanded}
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
                    {/* Labels */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-dark-textSecondary">Min</span>
                        <span className="text-dark-textSecondary">Max</span>
                    </div>

                    {/* slider container with visual fill */}
                    <div className="relative pt-2 pb-4">
                        {/* visual background with filled segment using inline background */}
                        <div
                            className="absolute inset-0 rounded pointer-events-none"
                            style={{
                                background: `linear-gradient(
                  to right,
                  rgba(59,130,246,0.12) 0%,
                  rgba(59,130,246,0.12) ${leftPercent}%,
                  rgba(59,130,246,0.9) ${leftPercent}%,
                  rgba(59,130,246,0.9) ${rightPercent}%,
                  rgba(59,130,246,0.12) ${rightPercent}%,
                  rgba(59,130,246,0.12) 100%)`,
                            }}
                        />

                        {/* two overlapping native range inputs */}
                        <input
                            aria-label="Minimum price"
                            type="range"
                            min={MIN}
                            max={MAX}
                            step={STEP}
                            value={minPrice}
                            onChange={handleMinChange}
                            className="range-slider left-slider"
                            style={{ zIndex: minPrice > MAX - 10000 ? 3 : 2 }}
                        />
                        <input
                            aria-label="Maximum price"
                            type="range"
                            min={MIN}
                            max={MAX}
                            step={STEP}
                            value={maxPrice}
                            onChange={handleMaxChange}
                            className="range-slider right-slider"
                            style={{ zIndex: 4 }}
                        />
                    </div>

                    {/* numeric display - readonly but selectable */}
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

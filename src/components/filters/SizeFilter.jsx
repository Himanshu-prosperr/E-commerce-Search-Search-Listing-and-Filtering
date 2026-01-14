import { useState } from 'react';
import { useFilters } from '../../context/FilterContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SizeFilter = () => {
    const { filters, toggleArrayFilter } = useFilters();
    const [isExpanded, setIsExpanded] = useState(true);

    const sizes = [
        { value: 'S', count: 245 },
        { value: 'M', count: 380 },
        { value: 'L', count: 420 },
        { value: 'XL', count: 315 },
        { value: 'XXL', count: 180 },
    ];

    return (
        <div className="border-b border-dark-border pb-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full mb-3"
            >
                <h3 className="font-semibold text-dark-text">Size</h3>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-dark-textSecondary" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-dark-textSecondary" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-2">
                    {sizes.map((size) => (
                        <label
                            key={size.value}
                            className="flex items-center justify-between cursor-pointer hover:bg-dark-hover p-1 rounded"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={filters.sizes?.includes(size.value) || false}
                                    onChange={() => toggleArrayFilter('sizes', size.value)}
                                    className="w-4 h-4 rounded border-dark-border text-primary-blue focus:ring-primary-blue focus:ring-offset-0 bg-dark-bg cursor-pointer"
                                />
                                <span className="text-sm text-dark-text">{size.value}</span>
                            </div>
                            <span className="text-xs text-dark-textSecondary">{size.count}+</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SizeFilter;
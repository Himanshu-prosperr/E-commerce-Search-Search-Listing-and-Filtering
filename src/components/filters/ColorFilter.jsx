import { useState } from 'react';
import { useFilters } from '../../context/FilterContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ColorFilter = () => {
    const { filters, toggleArrayFilter } = useFilters();
    const [isExpanded, setIsExpanded] = useState(true);

    const colors = [
        { name: 'Black', hex: '#000000', count: 90 },
        { name: 'White', hex: '#FFFFFF', count: 75 },
        { name: 'Blue', hex: '#3B82F6', count: 60 },
        { name: 'Red', hex: '#EF4444', count: 45 },
        { name: 'Green', hex: '#10B981', count: 38 },
        { name: 'Purple', hex: '#8B5CF6', count: 25 },
    ];

    return (
        <div className="pb-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full mb-3"
            >
                <h3 className="font-semibold text-dark-text">Color</h3>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-dark-textSecondary" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-dark-textSecondary" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-2">
                    {colors.map((color) => (
                        <label
                            key={color.name}
                            className="flex items-center justify-between cursor-pointer hover:bg-dark-hover p-1 rounded"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={filters.colors.includes(color.name)}
                                    onChange={() => toggleArrayFilter('colors', color.name)}
                                    className="w-4 h-4 rounded border-dark-border text-primary-blue focus:ring-primary-blue focus:ring-offset-0 bg-dark-bg cursor-pointer"
                                />
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-4 h-4 rounded-full border border-dark-border"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <span className="text-sm text-dark-text">{color.name}</span>
                                </div>
                            </div>
                            <span className="text-xs text-dark-textSecondary">{color.count}+</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorFilter;
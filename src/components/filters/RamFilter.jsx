import { useState } from 'react';
import { useFilters } from '../../context/FilterContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const RamFilter = () => {
    const { filters, toggleArrayFilter } = useFilters();
    const [isExpanded, setIsExpanded] = useState(true);

    const ramOptions = [
        { value: '4GB', count: 119 },
        { value: '6GB', count: 350 },
        { value: '8GB', count: 390 },
        { value: '12GB', count: 200 },
    ];

    return (
        <div className="border-b border-dark-border pb-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full mb-3"
            >
                <h3 className="font-semibold text-dark-text">RAM</h3>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-dark-textSecondary" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-dark-textSecondary" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-2">
                    {ramOptions.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center justify-between cursor-pointer hover:bg-dark-hover p-1 rounded"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={filters.ram.includes(option.value)}
                                    onChange={() => toggleArrayFilter('ram', option.value)}
                                    className="w-4 h-4 rounded border-dark-border text-primary-blue focus:ring-primary-blue focus:ring-offset-0 bg-dark-bg cursor-pointer"
                                />
                                <span className="text-sm text-dark-text">{option.value}</span>
                            </div>
                            <span className="text-xs text-dark-textSecondary">{option.count}+</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RamFilter;
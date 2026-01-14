import { useState } from 'react';
import { useFilters } from '../../context/FilterContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const StorageFilter = () => {
    const { filters, toggleArrayFilter } = useFilters();
    const [isExpanded, setIsExpanded] = useState(true);

    const storageOptions = [
        { value: '64GB', count: 353 },
        { value: '128GB', count: 555 },
        { value: '256GB', count: 853 },
        { value: '512GB', count: 255 },
        { value: '1TB', count: 390 },
    ];

    return (
        <div className="border-b border-dark-border pb-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full mb-3"
            >
                <h3 className="font-semibold text-dark-text">Internal Storage</h3>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-dark-textSecondary" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-dark-textSecondary" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-2">
                    {storageOptions.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center justify-between cursor-pointer hover:bg-dark-hover p-1 rounded"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={filters.storage.includes(option.value)}
                                    onChange={() => toggleArrayFilter('storage', option.value)}
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

export default StorageFilter;
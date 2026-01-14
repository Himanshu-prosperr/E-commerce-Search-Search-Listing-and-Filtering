import { useState } from 'react';
import { useFilters } from '../../context/FilterContext';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

const RatingFilter = () => {
    const { filters, toggleArrayFilter } = useFilters();
    const [isExpanded, setIsExpanded] = useState(true);

    const ratings = [
        { stars: 4, label: '4★ & above', count: 1280 },
        { stars: 3, label: '3★ & above', count: 850 },
        { stars: 2, label: '2★ & above', count: 550 },
        { stars: 1, label: '1★ & above', count: 280 },
    ];

    const renderStars = (count) => {
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3 h-3 ${i < count
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-dark-textSecondary'
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="border-b border-dark-border pb-4">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full mb-3"
            >
                <h3 className="font-semibold text-dark-text">Average Customer Rating</h3>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-dark-textSecondary" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-dark-textSecondary" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-2">
                    {ratings.map((rating) => (
                        <label
                            key={rating.stars}
                            className="flex items-center justify-between cursor-pointer hover:bg-dark-hover p-1 rounded"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={filters.ratings.includes(rating.stars)}
                                    onChange={() => toggleArrayFilter('ratings', rating.stars)}
                                    className="w-4 h-4 rounded border-dark-border text-primary-blue focus:ring-primary-blue focus:ring-offset-0 bg-dark-bg cursor-pointer"
                                />
                                <div className="flex items-center gap-2">
                                    {renderStars(rating.stars)}
                                    <span className="text-sm text-dark-textSecondary">{rating.label}</span>
                                </div>
                            </div>
                            <span className="text-xs text-dark-textSecondary">{rating.count}+</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RatingFilter;
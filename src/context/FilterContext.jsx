import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within FilterProvider');
    }
    return context;
};

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        search: '',
        brands: [],
        priceRange: [0, 200000],
        ratings: [],
        storage: [],
        ram: [],
        colors: [],
        sizes: [],
        category: '',
    });

    const [sortBy, setSortBy] = useState('featured');

    const updateFilter = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const toggleArrayFilter = (filterName, value) => {
        setFilters(prev => {
            const currentArray = prev[filterName];
            const isSelected = currentArray.includes(value);

            return {
                ...prev,
                [filterName]: isSelected
                    ? currentArray.filter(item => item !== value)
                    : [...currentArray, value]
            };
        });
    };

    const clearFilter = (filterName) => {
        if (Array.isArray(filters[filterName])) {
            setFilters(prev => ({
                ...prev,
                [filterName]: []
            }));
        } else if (filterName === 'priceRange') {
            setFilters(prev => ({
                ...prev,
                priceRange: [0, 200000]
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                [filterName]: ''
            }));
        }
    };

    const clearAllFilters = () => {
        setFilters({
            search: filters.search, // Keep search query
            brands: [],
            priceRange: [0, 200000],
            ratings: [],
            storage: [],
            ram: [],
            colors: [],
            sizes: [],
            category: '',
        });
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (filters.brands.length > 0) count += filters.brands.length;
        if (filters.ratings.length > 0) count += filters.ratings.length;
        if (filters.storage.length > 0) count += filters.storage.length;
        if (filters.ram.length > 0) count += filters.ram.length;
        if (filters.colors.length > 0) count += filters.colors.length;
        if (filters.sizes && filters.sizes.length > 0) count += filters.sizes.length;
        if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200000) count += 1;
        return count;
    };

    return (
        <FilterContext.Provider
            value={{
                filters,
                sortBy,
                setSortBy,
                updateFilter,
                toggleArrayFilter,
                clearFilter,
                clearAllFilters,
                getActiveFiltersCount,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
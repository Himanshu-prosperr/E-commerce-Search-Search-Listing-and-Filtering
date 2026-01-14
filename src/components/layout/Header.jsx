import { Search, Menu, Home } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFilters } from '../../context/FilterContext';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateFilter } = useFilters();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            updateFilter('search', searchQuery.trim());

            // If not on a products page, navigate to electronics > mobile-phones by default
            if (!location.pathname.includes('/products/')) {
                navigate('/products/electronics/mobile-phones');
            }
        }
    };

    const handleLogoClick = () => {
        setSearchQuery('');
        updateFilter('search', '');
        navigate('/');
    };

    return (
        <header className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <div
                        onClick={handleLogoClick}
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                    >
                        <div className="bg-primary-blue p-2 rounded">
                            <Home className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-dark-text">E-Commerce</h1>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 pr-10 text-dark-text placeholder-dark-textSecondary focus:outline-none focus:border-primary-blue"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-dark-textSecondary hover:text-primary-blue"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <button className="px-4 py-2 bg-dark-bg hover:bg-dark-hover rounded-lg text-dark-text text-sm">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
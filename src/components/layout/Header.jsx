// import { Search, Menu, Home } from 'lucide-react';
// import { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useFilters } from '../../context/FilterContext';

// const Header = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { updateFilter } = useFilters();
//     const [searchQuery, setSearchQuery] = useState('');

//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             updateFilter('search', searchQuery.trim());

//             // If not on a products page, navigate to electronics > mobile-phones by default
//             if (!location.pathname.includes('/products/')) {
//                 navigate('/products/electronics/mobile-phones');
//             }
//         }
//     };

//     const handleLogoClick = () => {
//         setSearchQuery('');
//         updateFilter('search', '');
//         navigate('/');
//     };

//     return (
//         <header className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 py-3">
//                 <div className="flex items-center gap-4">
//                     {/* Logo */}
//                     <div
//                         onClick={handleLogoClick}
//                         className="flex items-center gap-2 cursor-pointer hover:opacity-80"
//                     >
//                         <div className="bg-primary-blue p-2 rounded">
//                             <Home className="w-5 h-5 text-white" />
//                         </div>
//                         <h1 className="text-xl font-bold text-dark-text">E-Commerce</h1>
//                     </div>

//                     {/* Search Bar */}
//                     <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
//                         <div className="relative">
//                             <input
//                                 type="text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 placeholder="Search for products..."
//                                 className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-2 pr-10 text-dark-text placeholder-dark-textSecondary focus:outline-none focus:border-primary-blue"
//                             />
//                             <button
//                                 type="submit"
//                                 className="absolute right-2 top-1/2 -translate-y-1/2 text-dark-textSecondary hover:text-primary-blue"
//                             >
//                                 <Search className="w-5 h-5" />
//                             </button>
//                         </div>
//                     </form>

//                     {/* Right side */}
//                     {/* <div className="flex items-center gap-4">
//                         <button className="px-4 py-2 bg-dark-bg hover:bg-dark-hover rounded-lg text-dark-text text-sm">
//                             Sign Up
//                         </button>
//                     </div> */}
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Home } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) return;

        const query = searchQuery.toLowerCase().trim();

        // 🔑 Keyword → Route mapping
        if (query.includes('laptop')) {
            navigate('/products/electronics/laptops');
        }
        else if (query.includes('mobile') || query.includes('phone')) {
            navigate('/products/electronics/mobile-phones');
        }
        else if (query.includes('women')) {
            navigate('/products/clothes/womens-wear');
        }
        else if (query.includes('men')) {
            navigate('/products/clothes/mens-wear');
        }
        else {
            // Optional fallback (can keep or remove)
            console.warn('No matching category for search:', query);
        }

        setSearchQuery('');
        setIsMobileMenuOpen(false);
    };


    return (
        <header className="sticky top-0 z-50 bg-dark-card border-b border-dark-border shadow-lg backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div
                        onClick={() => navigate('/')}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow-blue group-hover:shadow-glow-purple transition-all duration-300">
                            <Home className="w-6 h-6 text-white" />
                        </div>
                        <h1
                            className="
    text-2xl font-extrabold tracking-tight
    bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400
    bg-clip-text text-transparent
    group-hover:brightness-110 transition-all
  "
                        >
                            Ecom&nbsp;Xplore
                        </h1>

                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <form onSubmit={handleSearch} className="w-full relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full pl-5 pr-12 py-2.5 bg-dark-bgSecondary border border-dark-border rounded-lg text-dark-text placeholder-dark-textMuted focus:outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue focus:ring-opacity-20 transition-all"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-primary text-white rounded-md hover:shadow-glow-blue transition-all"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Sign Up Button */}
                        {/* <button className="hidden md:flex items-center gap-2 px-5 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-glow-blue transition-all font-medium">
                            <User className="w-4 h-4" />
                            Sign Up
                        </button> */}

                        {/* Cart Icon */}
                        {/* <button className="relative p-2 hover:bg-dark-bgSecondary rounded-lg transition-all">
                            <ShoppingCart className="w-6 h-6 text-dark-text" />
                            <span className="absolute -top-1 -right-1 bg-accent-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                0
                            </span>
                        </button> */}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-dark-bgSecondary rounded-lg transition-all"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-dark-text" />
                            ) : (
                                <Menu className="w-6 h-6 text-dark-text" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-dark-border animate-slide-up">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="mb-4 relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full pl-5 pr-12 py-2.5 bg-dark-bgSecondary border border-dark-border rounded-lg text-dark-text placeholder-dark-textMuted focus:outline-none focus:border-primary-blue"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-primary text-white rounded-md"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </form>

                        {/* Mobile Sign Up */}
                        <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-primary text-white rounded-lg font-medium">
                            <User className="w-4 h-4" />
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
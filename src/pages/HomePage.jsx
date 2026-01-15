// import { useNavigate } from 'react-router-dom';
// import { Smartphone, Laptop, ShirtIcon, Users } from 'lucide-react';

// const HomePage = () => {
//     const navigate = useNavigate();

//     const categories = [
//         {
//             id: 'electronics',
//             name: 'Electronics',
//             description: 'Mobile Phones, Laptops, and more',
//             icon: Smartphone,
//             color: 'bg-blue-500',
//             hoverColor: 'hover:bg-blue-600',
//         },
//         {
//             id: 'clothes',
//             name: 'Clothes',
//             description: "Men's Wear, Women's Wear, and more",
//             icon: ShirtIcon,
//             color: 'bg-purple-500',
//             hoverColor: 'hover:bg-purple-600',
//         },
//     ];

//     return (
//         <div className="min-h-[80vh] flex flex-col items-center justify-center">
//             {/* Hero Section */}
//             <div className="text-center mb-12">
//                 <h1 className="text-5xl font-bold text-dark-text mb-4">
//                     Welcome to Ecom&nbsp;Xplore
//                 </h1>
//                 <p className="text-xl text-dark-textSecondary">
//                     Find the best products at the best prices
//                 </p>
//             </div>

//             {/* Category Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
//                 {categories.map((category) => {
//                     const Icon = category.icon;
//                     return (
//                         <div
//                             key={category.id}
//                             onClick={() => navigate(`/category/${category.id}`)}
//                             className="bg-dark-card rounded-xl p-8 border border-dark-border hover:border-primary-blue transition-all cursor-pointer group"
//                         >
//                             <div className="flex flex-col items-center text-center">
//                                 <div className={`${category.color} ${category.hoverColor} p-6 rounded-full mb-6 transition-colors`}>
//                                     <Icon className="w-12 h-12 text-white" />
//                                 </div>
//                                 <h2 className="text-2xl font-bold text-dark-text mb-2 group-hover:text-primary-blue transition-colors">
//                                     {category.name}
//                                 </h2>
//                                 <p className="text-dark-textSecondary">
//                                     {category.description}
//                                 </p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Featured Section */}
//             <div className="mt-16 text-center">
//                 <p className="text-dark-textSecondary">
//                     Browse thousands of products across multiple categories
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default HomePage;

import { useNavigate } from 'react-router-dom';
import { Smartphone, Laptop, ShirtIcon, Sparkles } from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: 'electronics',
            name: 'Electronics',
            description: 'Mobile Phones, Laptops, and more',
            icon: Smartphone,
            gradient: 'from-blue-500 to-cyan-500',
            hoverGradient: 'hover:from-blue-600 hover:to-cyan-600',
            bgGlow: 'hover:shadow-glow-blue',
        },
        {
            id: 'clothes',
            name: 'Clothes',
            description: "Men's Wear, Women's Wear, and more",
            icon: ShirtIcon,
            gradient: 'from-purple-500 to-pink-500',
            hoverGradient: 'hover:from-purple-600 hover:to-pink-600',
            bgGlow: 'hover:shadow-glow-purple',
        },
    ];

    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-blue opacity-10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-purple opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-16 relative z-10 animate-fade-in">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-8 h-8 text-primary-blue animate-pulse" />
                    <span className="text-sm font-semibold text-primary-blue uppercase tracking-wider">
                        Welcome to
                    </span>

                </div>
                {/* <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-blue via-accent-purple to-primary-blue bg-clip-text text-transparent animate-slide-up">
                    Ecom&nbsp;Xplore
                </h1> */}
                <h1
                    className="text-6xl md:text-7xl font-bold mb-6
             bg-linear-to-r from-blue-400 via-purple-500 to-blue-400
             bg-clip-text text-transparent animate-slide-up"
                >
                    Ecom&nbsp;Xplore
                </h1>


                <p className="text-2xl text-dark-textSecondary max-w-2xl mx-auto leading-relaxed">
                    Find the best products at the{' '}
                    <span className="text-primary-blue font-semibold">best prices</span>
                </p>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-4 relative z-10">
                {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                        <div
                            key={category.id}
                            onClick={() => navigate(`/category/${category.id}`)}
                            className={`group relative bg-dark-card rounded-2xl p-10 border-2 border-dark-border hover:border-transparent ${category.bgGlow} transition-all duration-300 cursor-pointer overflow-hidden animate-scale-in`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-linear-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`bg-linear-to-br ${category.gradient} p-8 rounded-2xl mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                    <Icon className="w-16 h-16 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-dark-text mb-3 group-hover:text-primary-blue transition-colors">
                                    {category.name}
                                </h2>
                                <p className="text-dark-textSecondary text-lg">
                                    {category.description}
                                </p>

                                {/* Hover arrow indicator */}
                                <div className="mt-6 flex items-center gap-2 text-primary-blue opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="font-semibold">Explore Now</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Featured Section */}
            <div className="mt-20 text-center relative z-10 animate-fade-in">
                <p className="text-dark-textSecondary text-lg">
                    Browse <span className="text-primary-blue font-semibold">thousands of products</span> across multiple categories
                </p>
            </div>
        </div>
    );
};

export default HomePage;
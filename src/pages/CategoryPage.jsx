// import { useNavigate, useParams } from 'react-router-dom';
// import { ChevronRight, Smartphone, Laptop, User, Users } from 'lucide-react';

// const CategoryPage = () => {
//     const navigate = useNavigate();
//     const { categoryId } = useParams();

//     // Category configurations
//     const categoryConfig = {
//         electronics: {
//             name: 'Electronics',
//             subCategories: [
//                 {
//                     id: 'mobile-phones',
//                     name: 'Mobile Phones',
//                     description: 'Smartphones from top brands',
//                     icon: Smartphone,
//                     color: 'bg-blue-500',
//                     hoverColor: 'hover:bg-blue-600',
//                     keywords: ['iphone', 'samsung', 'oneplus', 'xiaomi', 'smartphone', 'mobile', 'phone'],
//                 },
//                 {
//                     id: 'laptops',
//                     name: 'Laptops',
//                     description: 'Powerful laptops for work and gaming',
//                     icon: Laptop,
//                     color: 'bg-green-500',
//                     hoverColor: 'hover:bg-green-600',
//                     keywords: ['macbook', 'dell', 'hp', 'lenovo', 'asus', 'laptop', 'notebook'],
//                 },
//             ],
//         },
//         clothes: {
//             name: 'Clothes',
//             subCategories: [
//                 {
//                     id: 'mens-wear',
//                     name: "Men's Wear",
//                     description: 'Shirts, Jeans, Jackets and more',
//                     icon: User,
//                     color: 'bg-indigo-500',
//                     hoverColor: 'hover:bg-indigo-600',
//                     keywords: ['shirt', 'jeans', 'jacket', 'tshirt', 't-shirt', 'trousers', 'men'],
//                 },
//                 {
//                     id: 'womens-wear',
//                     name: "Women's Wear",
//                     description: 'Dresses, Tops, Skirts and more',
//                     icon: Users,
//                     color: 'bg-pink-500',
//                     hoverColor: 'hover:bg-pink-600',
//                     keywords: ['dress', 'top', 'skirt', 'saree', 'kurti', 'blouse', 'women'],
//                 },
//             ],
//         },
//     };

//     const currentCategory = categoryConfig[categoryId];

//     if (!currentCategory) {
//         return (
//             <div className="text-center py-20">
//                 <h2 className="text-2xl text-dark-text">Category not found</h2>
//                 <button
//                     onClick={() => navigate('/')}
//                     className="mt-4 px-6 py-2 bg-primary-blue hover:bg-primary-blueHover text-white rounded-lg"
//                 >
//                     Go to Home
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div>
//             {/* Breadcrumb */}
//             <div className="flex items-center gap-2 text-sm text-dark-textSecondary mb-6">
//                 <span
//                     onClick={() => navigate('/')}
//                     className="hover:text-dark-text cursor-pointer"
//                 >
//                     Home
//                 </span>
//                 <ChevronRight className="w-4 h-4" />
//                 <span className="text-dark-text">{currentCategory.name}</span>
//             </div>

//             {/* Header */}
//             <div className="mb-12 text-center">
//                 <h1 className="text-4xl font-bold text-dark-text mb-4">
//                     {currentCategory.name}
//                 </h1>
//                 <p className="text-lg text-dark-textSecondary">
//                     Select a sub-category to start shopping
//                 </p>
//             </div>

//             {/* Sub-Category Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
//                 {currentCategory.subCategories.map((subCategory) => {
//                     const Icon = subCategory.icon;
//                     return (
//                         <div
//                             key={subCategory.id}
//                             onClick={() => navigate(`/products/${categoryId}/${subCategory.id}`)}
//                             className="bg-dark-card rounded-xl p-8 border border-dark-border hover:border-primary-blue transition-all cursor-pointer group"
//                         >
//                             <div className="flex flex-col items-center text-center">
//                                 <div className={`${subCategory.color} ${subCategory.hoverColor} p-6 rounded-full mb-6 transition-colors`}>
//                                     <Icon className="w-10 h-10 text-white" />
//                                 </div>
//                                 <h2 className="text-xl font-bold text-dark-text mb-2 group-hover:text-primary-blue transition-colors">
//                                     {subCategory.name}
//                                 </h2>
//                                 <p className="text-dark-textSecondary text-sm">
//                                     {subCategory.description}
//                                 </p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;

import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Smartphone, Laptop, User, Users } from 'lucide-react';

const CategoryPage = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();

    // Category configurations
    const categoryConfig = {
        electronics: {
            name: 'Electronics',
            subCategories: [
                {
                    id: 'mobile-phones',
                    name: 'Mobile Phones',
                    description: 'Smartphones from top brands',
                    icon: Smartphone,
                    gradient: 'from-blue-500 to-cyan-500',
                    bgGlow: 'hover:shadow-glow-blue',
                },
                {
                    id: 'laptops',
                    name: 'Laptops',
                    description: 'Powerful laptops for work and gaming',
                    icon: Laptop,
                    gradient: 'from-green-500 to-emerald-500',
                    bgGlow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
                },
            ],
        },
        clothes: {
            name: 'Clothes',
            subCategories: [
                {
                    id: 'mens-wear',
                    name: "Men's Wear",
                    description: 'Shirts, Jeans, Jackets and more',
                    icon: User,
                    gradient: 'from-indigo-500 to-blue-500',
                    bgGlow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]',
                },
                {
                    id: 'womens-wear',
                    name: "Women's Wear",
                    description: 'Dresses, Tops, Skirts and more',
                    icon: Users,
                    gradient: 'from-pink-500 to-rose-500',
                    bgGlow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]',
                },
            ],
        },
    };

    const currentCategory = categoryConfig[categoryId];

    if (!currentCategory) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-dark-text mb-4">Category not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-glow-blue transition-all font-medium"
                >
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-dark-textSecondary mb-8">
                <span
                    onClick={() => navigate('/')}
                    className="hover:text-primary-blue cursor-pointer transition-colors"
                >
                    Home
                </span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-dark-text font-medium">{currentCategory.name}</span>
            </div>

            {/* Header */}
            <div className="mb-16 text-center">
                <h1 className="text-5xl font-bold text-dark-text mb-4 bg-linear-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">
                    {currentCategory.name}
                </h1>
                <p className="text-xl text-dark-textSecondary">
                    Select a sub-category to start shopping
                </p>
            </div>

            {/* Sub-Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {currentCategory.subCategories.map((subCategory, index) => {
                    const Icon = subCategory.icon;
                    return (
                        <div
                            key={subCategory.id}
                            onClick={() => navigate(`/products/${categoryId}/${subCategory.id}`)}
                            className={`group relative bg-dark-card rounded-2xl p-10 border-2 border-dark-border hover:border-transparent ${subCategory.bgGlow} transition-all duration-300 cursor-pointer overflow-hidden animate-scale-in`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-linear-to-br ${subCategory.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`bg-linear-to-br ${subCategory.gradient} p-8 rounded-2xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                    <Icon className="w-14 h-14 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-dark-text mb-3 group-hover:text-primary-blue transition-colors">
                                    {subCategory.name}
                                </h2>
                                <p className="text-dark-textSecondary text-base">
                                    {subCategory.description}
                                </p>

                                {/* Hover arrow indicator */}
                                <div className="mt-6 flex items-center gap-2 text-primary-blue opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="font-semibold">Browse Products</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryPage;
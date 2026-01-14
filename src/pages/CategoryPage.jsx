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
                    color: 'bg-blue-500',
                    hoverColor: 'hover:bg-blue-600',
                    keywords: ['iphone', 'samsung', 'oneplus', 'xiaomi', 'smartphone', 'mobile', 'phone'],
                },
                {
                    id: 'laptops',
                    name: 'Laptops',
                    description: 'Powerful laptops for work and gaming',
                    icon: Laptop,
                    color: 'bg-green-500',
                    hoverColor: 'hover:bg-green-600',
                    keywords: ['macbook', 'dell', 'hp', 'lenovo', 'asus', 'laptop', 'notebook'],
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
                    color: 'bg-indigo-500',
                    hoverColor: 'hover:bg-indigo-600',
                    keywords: ['shirt', 'jeans', 'jacket', 'tshirt', 't-shirt', 'trousers', 'men'],
                },
                {
                    id: 'womens-wear',
                    name: "Women's Wear",
                    description: 'Dresses, Tops, Skirts and more',
                    icon: Users,
                    color: 'bg-pink-500',
                    hoverColor: 'hover:bg-pink-600',
                    keywords: ['dress', 'top', 'skirt', 'saree', 'kurti', 'blouse', 'women'],
                },
            ],
        },
    };

    const currentCategory = categoryConfig[categoryId];

    if (!currentCategory) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl text-dark-text">Category not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2 bg-primary-blue hover:bg-primary-blueHover text-white rounded-lg"
                >
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-dark-textSecondary mb-6">
                <span
                    onClick={() => navigate('/')}
                    className="hover:text-dark-text cursor-pointer"
                >
                    Home
                </span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-dark-text">{currentCategory.name}</span>
            </div>

            {/* Header */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-dark-text mb-4">
                    {currentCategory.name}
                </h1>
                <p className="text-lg text-dark-textSecondary">
                    Select a sub-category to start shopping
                </p>
            </div>

            {/* Sub-Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {currentCategory.subCategories.map((subCategory) => {
                    const Icon = subCategory.icon;
                    return (
                        <div
                            key={subCategory.id}
                            onClick={() => navigate(`/products/${categoryId}/${subCategory.id}`)}
                            className="bg-dark-card rounded-xl p-8 border border-dark-border hover:border-primary-blue transition-all cursor-pointer group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className={`${subCategory.color} ${subCategory.hoverColor} p-6 rounded-full mb-6 transition-colors`}>
                                    <Icon className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-dark-text mb-2 group-hover:text-primary-blue transition-colors">
                                    {subCategory.name}
                                </h2>
                                <p className="text-dark-textSecondary text-sm">
                                    {subCategory.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryPage;
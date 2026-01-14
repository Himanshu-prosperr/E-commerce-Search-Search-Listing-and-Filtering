import { useNavigate } from 'react-router-dom';
import { Smartphone, Laptop, ShirtIcon, Users } from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: 'electronics',
            name: 'Electronics',
            description: 'Mobile Phones, Laptops, and more',
            icon: Smartphone,
            color: 'bg-blue-500',
            hoverColor: 'hover:bg-blue-600',
        },
        {
            id: 'clothes',
            name: 'Clothes',
            description: "Men's Wear, Women's Wear, and more",
            icon: ShirtIcon,
            color: 'bg-purple-500',
            hoverColor: 'hover:bg-purple-600',
        },
    ];

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-dark-text mb-4">
                    Welcome to E-Commerce
                </h1>
                <p className="text-xl text-dark-textSecondary">
                    Find the best products at the best prices
                </p>
            </div>

            {/* Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <div
                            key={category.id}
                            onClick={() => navigate(`/category/${category.id}`)}
                            className="bg-dark-card rounded-xl p-8 border border-dark-border hover:border-primary-blue transition-all cursor-pointer group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className={`${category.color} ${category.hoverColor} p-6 rounded-full mb-6 transition-colors`}>
                                    <Icon className="w-12 h-12 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-dark-text mb-2 group-hover:text-primary-blue transition-colors">
                                    {category.name}
                                </h2>
                                <p className="text-dark-textSecondary">
                                    {category.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Featured Section */}
            <div className="mt-16 text-center">
                <p className="text-dark-textSecondary">
                    Browse thousands of products across multiple categories
                </p>
            </div>
        </div>
    );
};

export default HomePage;
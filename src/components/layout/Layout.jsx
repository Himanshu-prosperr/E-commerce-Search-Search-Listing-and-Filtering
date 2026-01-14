// import Header from './Header';

// const Layout = ({ children }) => {
//     return (
//         <div className="min-h-screen bg-dark-bg">
//             <Header />
//             <main className="max-w-7xl mx-auto px-4 py-6">
//                 {children}
//             </main>
//         </div>
//     );
// };

// export default Layout;

import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div className="min-h-screen bg-dark-bg text-dark-text">
            {/* Global Header */}
            <Header />

            {/* Page Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;

// import { FilterProvider } from './context/FilterContext';
// import Layout from './components/layout/Layout';
// import SearchResultsPage from './pages/SearchResultsPage';
// import './index.css';

// function App() {
//   const handleSearch = (query) => {
//     console.log('Searching for:', query);
//     // We'll implement this later when connecting to backend
//   };

//   return (
//     <FilterProvider>
//       <Layout onSearch={handleSearch}>
//         <SearchResultsPage />
//       </Layout>
//     </FilterProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SearchResultsPage from './pages/SearchResultsPage';

import './index.css';

function App() {
  return (
    <Router>
      <FilterProvider>
        <Routes>
          {/* Layout Route */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route
              path="/products/:categoryId/:subCategoryId"
              element={<SearchResultsPage />}
            />
          </Route>
        </Routes>
      </FilterProvider>
    </Router>
  );
}

export default App;

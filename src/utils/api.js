// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const productAPI = {
    getProducts: (params) =>
        axios.get(`${API_BASE_URL}/products`, { params }),

    getFilterOptions: (subCategoryId) =>
        axios.get(`${API_BASE_URL}/products/filters`, {
            params: { subCategoryId }
        }),

    getProductById: (id) =>
        axios.get(`${API_BASE_URL}/products/${id}`)
};
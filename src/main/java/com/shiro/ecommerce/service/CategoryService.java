package com.shiro.ecommerce.service;

import com.shiro.ecommerce.model.Category;
import com.shiro.ecommerce.model.SubCategory;
import com.shiro.ecommerce.repository.CategoryRepository;
import com.shiro.ecommerce.repository.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    /**
     * Get all categories
     */
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Get subcategories by category ID
     */
    public List<SubCategory> getSubCategoriesByCategoryId(String categoryId) {
        return subCategoryRepository.findByCategoryId(categoryId);
    }

    /**
     * Get subcategory by ID
     */
    public SubCategory getSubCategoryById(String id) {
        return subCategoryRepository.findById(id).orElse(null);
    }
}
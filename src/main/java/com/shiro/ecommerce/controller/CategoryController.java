package com.shiro.ecommerce.controller;

import com.shiro.ecommerce.model.Category;
import com.shiro.ecommerce.model.SubCategory;
import com.shiro.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Slf4j
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * GET /api/categories
     * Get all categories
     */
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        log.info("GET /api/categories");
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    /**
     * GET /api/categories/{categoryId}/subcategories
     * Get subcategories for a category
     */
    @GetMapping("/{categoryId}/subcategories")
    public ResponseEntity<List<SubCategory>> getSubCategories(@PathVariable String categoryId) {
        log.info("GET /api/categories/{}/subcategories", categoryId);
        List<SubCategory> subCategories = categoryService.getSubCategoriesByCategoryId(categoryId);
        return ResponseEntity.ok(subCategories);
    }
}
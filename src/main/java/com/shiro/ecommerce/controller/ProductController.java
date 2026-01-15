package com.shiro.ecommerce.controller;

import com.shiro.ecommerce.dto.FilterOptionsDTO;
import com.shiro.ecommerce.dto.ProductDTO;
import com.shiro.ecommerce.dto.ProductResponseDTO;
import com.shiro.ecommerce.model.Product;
import com.shiro.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    /**
     * GET /api/products?subCategoryId=mobile-phones&brands=Apple&minPrice=50000...
     * Get filtered and paginated products
     */
    @GetMapping
    public ResponseEntity<ProductResponseDTO> getProducts(
            @RequestParam String subCategoryId,
            @RequestParam(required = false) List<String> brands,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) List<String> storage,
            @RequestParam(required = false) List<String> ram,
            @RequestParam(required = false) List<String> sizes,
            @RequestParam(required = false) List<String> colors,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "relevance") String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        log.info("GET /api/products - subCategoryId: {}, search: {}, sortBy: {}",
                subCategoryId, search, sortBy);

        ProductResponseDTO response = productService.getProducts(
                subCategoryId, brands, minPrice, maxPrice, minRating,
                storage, ram, sizes, colors, search, sortBy, page, size
        );

        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/products/filters?subCategoryId=mobile-phones
     * Get available filter options
     */
    @GetMapping("/filters")
    public ResponseEntity<FilterOptionsDTO> getFilterOptions(
            @RequestParam String subCategoryId
    ) {
        log.info("GET /api/products/filters - subCategoryId: {}", subCategoryId);
        FilterOptionsDTO filterOptions = productService.getFilterOptions(subCategoryId);
        return ResponseEntity.ok(filterOptions);
    }

    /**
     * GET /api/products/{id}
     * Get single product by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        log.info("GET /api/products/{}", id);
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    /**
     * POST /api/products
     * Create a new product
     */
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        log.info("POST /api/products - Creating: {}", productDTO.getName());
        Product product = productService.createProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(product);
    }

    /**
     * PUT /api/products/{id}
     * Update an existing product
     */
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable String id,
            @Valid @RequestBody ProductDTO productDTO
    ) {
        log.info("PUT /api/products/{} - Updating: {}", id, productDTO.getName());
        Product product = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(product);
    }

    /**
     * DELETE /api/products/{id}
     * Delete a product
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        log.info("DELETE /api/products/{}", id);
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /api/products/bulk
     * Bulk insert products (for data seeding)
     */
    @PostMapping("/bulk")
    public ResponseEntity<List<Product>> bulkInsertProducts(
            @Valid @RequestBody List<ProductDTO> productDTOs
    ) {
        log.info("POST /api/products/bulk - Inserting {} products", productDTOs.size());
        List<Product> products = productService.bulkInsertProducts(productDTOs);
        return ResponseEntity.status(HttpStatus.CREATED).body(products);
    }
}
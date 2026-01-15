package com.shiro.ecommerce.service;

import com.shiro.ecommerce.dto.FilterOptionsDTO;
import com.shiro.ecommerce.dto.ProductDTO;
import com.shiro.ecommerce.dto.ProductResponseDTO;
import com.shiro.ecommerce.exception.ResourceNotFoundException;
import com.shiro.ecommerce.model.Product;
import com.shiro.ecommerce.model.ProductSpecs;
import com.shiro.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    /**
     * Get filtered products with pagination
     */
    public ProductResponseDTO getProducts(
            String subCategoryId,
            List<String> brands,
            Double minPrice,
            Double maxPrice,
            Double minRating,
            List<String> storage,
            List<String> ram,
            List<String> sizes,
            List<String> colors,
            String search,
            String sortBy,
            int page,
            int size
    ) {
        log.info("Fetching products for subCategoryId: {}", subCategoryId);

        // Get all products for the subcategory
        List<Product> products = productRepository.findBySubCategoryId(subCategoryId);

        // Apply filters
        List<Product> filteredProducts = products.stream()
                .filter(p -> brands == null || brands.isEmpty() || brands.contains(p.getBrand()))
                .filter(p -> minPrice == null || p.getPrice() >= minPrice)
                .filter(p -> maxPrice == null || p.getPrice() <= maxPrice)
                .filter(p -> minRating == null || p.getRating() >= minRating)
                .filter(p -> filterBySpecs(p, storage, ram, sizes, colors))
                .filter(p -> search == null || search.isEmpty() ||
                        p.getName().toLowerCase().contains(search.toLowerCase()) ||
                        p.getBrand().toLowerCase().contains(search.toLowerCase()))
                .collect(Collectors.toList());

        // Apply sorting
        filteredProducts = sortProducts(filteredProducts, sortBy);

        // Calculate pagination
        long totalProducts = filteredProducts.size();
        int totalPages = (int) Math.ceil((double) totalProducts / size);
        int startIndex = page * size;
        int endIndex = Math.min(startIndex + size, filteredProducts.size());

        List<Product> paginatedProducts = startIndex < filteredProducts.size()
                ? filteredProducts.subList(startIndex, endIndex)
                : new ArrayList<>();

        ProductResponseDTO response = new ProductResponseDTO();
        response.setProducts(paginatedProducts);
        response.setTotalProducts(totalProducts);
        response.setCurrentPage(page);
        response.setTotalPages(totalPages);
        response.setPageSize(size);

        return response;
    }

    /**
     * Filter products by specs
     */
    private boolean filterBySpecs(Product product, List<String> storage,
                                  List<String> ram, List<String> sizes, List<String> colors) {
        ProductSpecs specs = product.getSpecs();

        if (storage != null && !storage.isEmpty()) {
            if (specs.getStorage() == null ||
                    storage.stream().noneMatch(s -> specs.getStorage().contains(s))) {
                return false;
            }
        }

        if (ram != null && !ram.isEmpty()) {
            if (specs.getRam() == null ||
                    ram.stream().noneMatch(r -> specs.getRam().contains(r))) {
                return false;
            }
        }

        if (sizes != null && !sizes.isEmpty()) {
            if (specs.getSize() == null || !sizes.contains(specs.getSize())) {
                return false;
            }
        }

        if (colors != null && !colors.isEmpty()) {
            if (specs.getColor() == null ||
                    colors.stream().noneMatch(c ->
                            specs.getColor().toLowerCase().contains(c.toLowerCase()))) {
                return false;
            }
        }

        return true;
    }

    /**
     * Sort products based on sortBy parameter
     */
    private List<Product> sortProducts(List<Product> products, String sortBy) {
        if (sortBy == null || sortBy.equals("relevance")) {
            return products;
        }

        return products.stream()
                .sorted((p1, p2) -> {
                    switch (sortBy) {
                        case "price-low":
                            return Double.compare(p1.getPrice(), p2.getPrice());
                        case "price-high":
                            return Double.compare(p2.getPrice(), p1.getPrice());
                        case "rating":
                            return Double.compare(p2.getRating(), p1.getRating());
                        default:
                            return 0;
                    }
                })
                .collect(Collectors.toList());
    }

    /**
     * Get filter options for a subcategory
     */
    public FilterOptionsDTO getFilterOptions(String subCategoryId) {
        List<Product> products = productRepository.findBySubCategoryId(subCategoryId);

        Set<String> brands = new HashSet<>();
        Set<String> storageOptions = new HashSet<>();
        Set<String> ramOptions = new HashSet<>();
        Set<String> sizeOptions = new HashSet<>();
        Set<String> colorOptions = new HashSet<>();

        double minPrice = Double.MAX_VALUE;
        double maxPrice = 0.0;

        for (Product p : products) {
            brands.add(p.getBrand());
            minPrice = Math.min(minPrice, p.getPrice());
            maxPrice = Math.max(maxPrice, p.getPrice());

            ProductSpecs specs = p.getSpecs();
            if (specs.getStorage() != null) storageOptions.add(specs.getStorage());
            if (specs.getRam() != null) ramOptions.add(specs.getRam());
            if (specs.getSize() != null) sizeOptions.add(specs.getSize());
            if (specs.getColor() != null) colorOptions.add(specs.getColor());
        }

        Map<String, Double> priceRange = new HashMap<>();
        priceRange.put("min", minPrice == Double.MAX_VALUE ? 0.0 : minPrice);
        priceRange.put("max", maxPrice);

        FilterOptionsDTO filterOptions = new FilterOptionsDTO();
        filterOptions.setBrands(new ArrayList<>(brands));
        filterOptions.setPriceRange(priceRange);
        filterOptions.setStorageOptions(new ArrayList<>(storageOptions));
        filterOptions.setRamOptions(new ArrayList<>(ramOptions));
        filterOptions.setSizeOptions(new ArrayList<>(sizeOptions));
        filterOptions.setColorOptions(new ArrayList<>(colorOptions));

        return filterOptions;
    }

    /**
     * Get product by ID
     */
    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    /**
     * Create a new product
     */
    public Product createProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setBrand(productDTO.getBrand());
        product.setCategoryId(productDTO.getCategoryId());
        product.setSubCategoryId(productDTO.getSubCategoryId());
        product.setPrice(productDTO.getPrice());
        product.setRating(productDTO.getRating());
        product.setReviews(productDTO.getReviews());
        product.setImage(productDTO.getImage());
        product.setSpecs(productDTO.getSpecs());
        product.setInStock(productDTO.getInStock());
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());

        log.info("Creating product: {}", product.getName());
        return productRepository.save(product);
    }

    /**
     * Update an existing product
     */
    public Product updateProduct(String id, ProductDTO productDTO) {
        Product product = getProductById(id);

        product.setName(productDTO.getName());
        product.setBrand(productDTO.getBrand());
        product.setCategoryId(productDTO.getCategoryId());
        product.setSubCategoryId(productDTO.getSubCategoryId());
        product.setPrice(productDTO.getPrice());
        product.setRating(productDTO.getRating());
        product.setReviews(productDTO.getReviews());
        product.setImage(productDTO.getImage());
        product.setSpecs(productDTO.getSpecs());
        product.setInStock(productDTO.getInStock());
        product.setUpdatedAt(LocalDateTime.now());

        log.info("Updating product: {}", product.getName());
        return productRepository.save(product);
    }

    /**
     * Delete a product
     */
    public void deleteProduct(String id) {
        Product product = getProductById(id);
        log.info("Deleting product: {}", product.getName());
        productRepository.delete(product);
    }

    /**
     * Bulk insert products (for data seeding)
     */
    public List<Product> bulkInsertProducts(List<ProductDTO> productDTOs) {
        List<Product> products = productDTOs.stream()
                .map(dto -> {
                    Product product = new Product();
                    product.setName(dto.getName());
                    product.setBrand(dto.getBrand());
                    product.setCategoryId(dto.getCategoryId());
                    product.setSubCategoryId(dto.getSubCategoryId());
                    product.setPrice(dto.getPrice());
                    product.setRating(dto.getRating());
                    product.setReviews(dto.getReviews());
                    product.setImage(dto.getImage());
                    product.setSpecs(dto.getSpecs());
                    product.setInStock(dto.getInStock());
                    product.setCreatedAt(LocalDateTime.now());
                    product.setUpdatedAt(LocalDateTime.now());
                    return product;
                })
                .collect(Collectors.toList());

        log.info("Bulk inserting {} products", products.size());
        return productRepository.saveAll(products);
    }
}

package com.shiro.ecommerce.model;

import com.shiro.ecommerce.model.ProductSpecs;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {

    @Id
    private String id;

    @Indexed
    private String name;

    @Indexed
    private String brand;

    @Indexed
    private String categoryId;      // "electronics" or "clothes"

    @Indexed
    private String subCategoryId;   // "mobile-phones", "laptops", "mens-wear", "women's-wear"

    private Double price;

    @Indexed
    private Double rating;

    private Integer reviews;

    private String image;           // Image URL

    private ProductSpecs specs;     // Embedded document

    private Boolean inStock;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
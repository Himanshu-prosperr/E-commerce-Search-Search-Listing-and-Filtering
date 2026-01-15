package com.shiro.ecommerce.dto;

import com.shiro.ecommerce.model.ProductSpecs;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private String id;

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotBlank(message = "Category ID is required")
    private String categoryId;

    @NotBlank(message = "SubCategory ID is required")
    private String subCategoryId;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;

    @Min(value = 0, message = "Rating must be at least 0")
    @Max(value = 5, message = "Rating must be at most 5")
    private Double rating;

    @Min(value = 0, message = "Reviews must be at least 0")
    private Integer reviews;

    @NotBlank(message = "Image URL is required")
    private String image;

    @NotNull(message = "Product specs are required")
    private ProductSpecs specs;

    private Boolean inStock = true;
}

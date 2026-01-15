package com.shiro.ecommerce.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSpecs {
    private String storage;  // For electronics: "256GB", "512GB", etc.
    private String ram;      // For electronics: "8GB", "16GB", etc.
    private String color;    // For all products: "Black", "Blue", etc.
    private String size;     // For clothes: "S", "M", "L", etc.
}


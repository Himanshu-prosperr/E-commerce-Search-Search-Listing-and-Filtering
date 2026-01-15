package com.shiro.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterOptionsDTO {

    private List<String> brands;

    private Map<String, Double> priceRange;  // {"min": 0, "max": 250000}

    private List<String> storageOptions;     // For electronics

    private List<String> ramOptions;         // For electronics

    private List<String> sizeOptions;        // For clothes

    private List<String> colorOptions;       // For all products
}
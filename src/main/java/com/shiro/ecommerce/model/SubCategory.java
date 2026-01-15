package com.shiro.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "subcategories")
public class SubCategory {

    @Id
    private String id;              // "mobile-phones", "laptops", etc.

    private String categoryId;      // Parent category: "electronics", "clothes"

    private String name;            // "Mobile Phones", "Laptops", etc.

    private List<String> validKeywords;     // For search validation

    private List<String> invalidKeywords;   // For search validation
}

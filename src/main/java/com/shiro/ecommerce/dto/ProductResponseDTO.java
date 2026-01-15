package com.shiro.ecommerce.dto;

import com.shiro.ecommerce.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {

    private List<Product> products;

    private Long totalProducts;

    private Integer currentPage;

    private Integer totalPages;

    private Integer pageSize;
}

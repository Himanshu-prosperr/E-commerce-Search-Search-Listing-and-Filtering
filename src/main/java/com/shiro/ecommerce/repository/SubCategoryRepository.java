package com.shiro.ecommerce.repository;

import com.shiro.ecommerce.model.SubCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubCategoryRepository extends MongoRepository<SubCategory, String> {

    // Find all subcategories by category ID
    List<SubCategory> findByCategoryId(String categoryId);
}
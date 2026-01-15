package com.shiro.ecommerce.repository;

import com.shiro.ecommerce.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    // Find by category and subcategory
    List<Product> findByCategoryIdAndSubCategoryId(String categoryId, String subCategoryId);

    // Find by subcategory only
    List<Product> findBySubCategoryId(String subCategoryId);

    // Find distinct brands by subcategory
    @Query(value = "{ 'subCategoryId': ?0 }", fields = "{ 'brand': 1 }")
    List<Product> findDistinctBrandsBySubCategoryId(String subCategoryId);

    // Count by subcategory
    Long countBySubCategoryId(String subCategoryId);

    // Search by name or brand
    @Query("{ 'subCategoryId': ?0, $or: [ { 'name': { $regex: ?1, $options: 'i' } }, { 'brand': { $regex: ?1, $options: 'i' } } ] }")
    List<Product> searchByNameOrBrand(String subCategoryId, String searchQuery);
}

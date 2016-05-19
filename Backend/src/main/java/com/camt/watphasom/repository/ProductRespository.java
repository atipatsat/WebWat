package com.camt.watphasom.repository;

import com.camt.watphasom.model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRespository extends CrudRepository<Product, Long> {
}

package com.camt.watphasom.repository;

import com.camt.watphasom.model.ProductOrder;
import org.springframework.data.repository.CrudRepository;

public interface ProductOrderRespository extends CrudRepository<ProductOrder, Long> {
    public Iterable<ProductOrder> findByCustomerId(long id);
}

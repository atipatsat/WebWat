package com.camt.watphasom.repository;

import com.camt.watphasom.model.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRespository extends CrudRepository<Customer, Long> {
    public Customer findByEmail(String email);
}


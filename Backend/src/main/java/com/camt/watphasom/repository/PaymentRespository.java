package com.camt.watphasom.repository;

import com.camt.watphasom.model.Payment;
import org.springframework.data.repository.CrudRepository;

public interface PaymentRespository extends CrudRepository<Payment, Long> {
}

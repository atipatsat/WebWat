package com.camt.watphasom.repository;

import com.camt.watphasom.model.Admin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AdminRespository extends CrudRepository<Admin, Long> {
    public Admin findById(int id);
    public Admin findByEmail(@Param("username") String username);
}

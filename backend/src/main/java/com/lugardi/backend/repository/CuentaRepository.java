package com.lugardi.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.lugardi.backend.models.Cuenta;

@Repository
public interface CuentaRepository extends PagingAndSortingRepository<Cuenta,UUID>{
    public List<Cuenta> findAll();
}

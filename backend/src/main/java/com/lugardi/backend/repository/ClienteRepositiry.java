package com.lugardi.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.lugardi.backend.models.Cliente;

@Repository
public interface ClienteRepositiry extends PagingAndSortingRepository<Cliente,UUID> {
    public List<Cliente> findAll();
}

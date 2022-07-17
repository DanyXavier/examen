package com.lugardi.backend.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.lugardi.backend.models.Movimiento;

@Repository
public interface MovimientoRepository extends PagingAndSortingRepository<Movimiento,UUID> {
    public List<Movimiento> findAllByCuentaIdAndFechaBetween(UUID id,LocalDate inicio,LocalDate fin);
    public List<Movimiento> findAllByCuentaClienteIdAndFechaBetween(UUID id,LocalDate inicio,LocalDate fin);
    public List<Movimiento> findAll();
}

package com.lugardi.backend.models.dto;

import java.time.LocalDate;

public class MovimientoDTO {
    public LocalDate fecha;
    public String cliente;
    public Long numeroCuenta;
    public String tipo;
    public Double saldoInicial;
    public Boolean estado;
    public Double movimiento;
    public Double saldoDisponible;
}

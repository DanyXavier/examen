package com.lugardi.backend.models;

import java.time.LocalDate;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table
public class Movimiento {
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue
    private UUID id;
    private LocalDate fecha;
    private String tipoMovimiento;
    @Column(precision = 10,scale = 4)
    private Double valor;
    @Column(precision = 10,scale = 4)
    private Double saldo;
    @ManyToOne
    private Cuenta cuenta;
    public Movimiento(UUID id, LocalDate fecha, String tipoMovimiento, Double valor, Double saldo,Cuenta cuenta) {
        this.id = id;
        this.fecha = fecha;
        this.tipoMovimiento = tipoMovimiento;
        this.valor = valor;
        this.saldo = saldo;
        this.cuenta = cuenta;
    }
    public Movimiento() {
    }
    public UUID getId() {
        return id;
    }
    public void setId(String id) {
        this.id = UUID.fromString(id);
    }
    public LocalDate getFecha() {
        return fecha;
    }
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
    public String getTipoMovimiento() {
        return tipoMovimiento;
    }
    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }
    public Double getValor() {
        return valor;
    }
    public void setValor(Double valor) {
        this.valor = valor;
    }
    public Double getSaldo() {
        return saldo;
    }
    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }
    public Cuenta getCuenta() {
        return cuenta;
    }
    public void setCuenta(Cuenta cuenta) {
        this.cuenta = cuenta;
    }
    @Override
    public String toString() {
        return "Movimiento [fecha=" + fecha + ", id=" + id + ", valor=" + valor +", saldo=" + saldo + ", tipoMovimiento="
                + tipoMovimiento + "]";
    }
}

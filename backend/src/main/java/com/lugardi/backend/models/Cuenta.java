package com.lugardi.backend.models;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table
public class Cuenta {
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue
    private UUID id;
    private Long numeroCuenta;
    private String tipoCuenta;
    @Column(precision = 10,scale = 4)
    private Double saldoInicial;
    private Boolean estado;
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    public Cuenta(UUID id, Long numeroCuenta, String tipoCuenta, Double saldoInicial, Boolean estado,Cliente cliente) {
        this.id = id;
        this.numeroCuenta = numeroCuenta;
        this.tipoCuenta = tipoCuenta;
        this.saldoInicial = saldoInicial;
        this.estado = estado;
        this.cliente = cliente;
    }
    public Cuenta(Long numeroCuenta, String tipoCuenta, Double saldoInicial, Boolean estado) {
        this.numeroCuenta = numeroCuenta;
        this.tipoCuenta = tipoCuenta;
        this.saldoInicial = saldoInicial;
        this.estado = estado;
    }
    public Cuenta() {
    }
    public UUID getId() {
        return id;
    }
    public void setId(String id) {
        this.id = UUID.fromString(id);
    }
    public Long getNumeroCuenta() {
        //String.format("%08d",numeroCuenta);
        return numeroCuenta;
    }
    public void setNumeroCuenta(Long numeroCuenta) {
        this.numeroCuenta = numeroCuenta;
    }
    public String getTipoCuenta() {
        return tipoCuenta;
    }
    public void setTipoCuenta(String tipoCuenta) {
        this.tipoCuenta = tipoCuenta;
    }
    public Double getSaldoInicial() {
        return saldoInicial;
    }
    public void setSaldoInicial(Double saldoInicial) {
        this.saldoInicial = saldoInicial;
    }
    public Boolean getEstado() {
        return estado;
    }
    public void setEstado(Boolean estado) {
        this.estado = estado;
    }
    public Cliente getCliente() {
        return cliente;
    }
    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    @Override
    public String toString() {
        return "Cuenta [estado=" + estado + ", id=" + id + ", numeroCuenta=" + numeroCuenta + ", saldoInicial="
                + saldoInicial + ", tipoCuenta=" + tipoCuenta + "]";
    }
}

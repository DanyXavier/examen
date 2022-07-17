package com.lugardi.backend.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lugardi.backend.error.ResponseHandlerException;
import com.lugardi.backend.models.Cuenta;
import com.lugardi.backend.models.Movimiento;
import com.lugardi.backend.models.dto.MovimientoDTO;
import com.lugardi.backend.repository.MovimientoRepository;
import com.lugardi.backend.services.converter.MovimientoConverter;

@Component
public class MovimientoService {
    @Autowired
    MovimientoRepository repository;
    @Autowired 
    CuentaService service;

    @Autowired
    MovimientoConverter converter;

    public Movimiento guardarMovimiento(Movimiento movimiento){
        try {
            repository.save(movimiento);
            return movimiento;
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        }
    }
    public List<Movimiento> obtenerMovimientos(){
        try {
            return repository.findAll();
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        }
    }
    public Movimiento obtenerMovimientoId(String id){
        try {
            return repository.findById(UUID.fromString(id))
            .orElseThrow(()->new ResponseHandlerException("No existe el movimiento con id " + id));
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        } 
    }
    public Movimiento editarMovimiento(Movimiento movimiento){
        try {
            return repository.save(movimiento);
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        }
    }
    public void eliminarMovimientoById(String id){
        try {
            repository.deleteById(UUID.fromString(id));
        } catch (Exception e) {
            throw new ResponseHandlerException("Lo sentimos ocurrion un Error");
        }
    }
    /**
     *  Los valores cuando son crédito son positivos, y los débitos son negativos. Debe
     *  almacenarse el saldo disponible en cada transacción dependiendo del tipo de 
     *  movimiento. (suma o resta)
     * @param movimiento
     */
    public Movimiento RealizarMovimiento(Movimiento movimiento){
        try {
            Cuenta cuenta = service.obtenerCuentaId(movimiento.getCuenta().getId());
            double valor = movimiento.getValor();
            double saldo = cuenta.getSaldoInicial();
            switch (movimiento.getTipoMovimiento()) {
                case "CREDITO":
                    saldo = saldo + valor;
                    movimiento.setSaldo(saldo);
                    cuenta.setSaldoInicial(saldo);
                    movimiento.setCuenta(cuenta);
                    break;
                case "DEBITO":
                    if(saldo==0d || saldo < valor){
                        throw new Exception("Saldo no disponible");
                    } 
                    saldo = valor<0? saldo + valor:saldo - valor;
                    movimiento.setValor(-valor);
                    cuenta.setSaldoInicial(saldo);
                    movimiento.setSaldo(saldo);
                    movimiento.setCuenta(cuenta);
                break;
                default:
                    break;
            }
            return repository.save(movimiento);
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        }
    }
    public List<MovimientoDTO> informeMovimientos(String fechaInicial,String fechaFinal,String clienteId){
        try {
            LocalDate inicio = LocalDate.parse(fechaInicial);
            LocalDate fin = LocalDate.parse(fechaFinal);
            UUID clienteID = UUID.fromString(clienteId);
            List<Movimiento> lista = repository.findAllByCuentaClienteIdAndFechaBetween(clienteID,inicio, fin);
            return lista.stream().map(item->converter.convertirMovimientoADto(item))
            .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResponseHandlerException("Lo sentimos ocurrion un Error");
        }
    }
}

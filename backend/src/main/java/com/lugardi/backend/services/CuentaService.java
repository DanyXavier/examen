package com.lugardi.backend.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lugardi.backend.error.ResponseHandlerException;
import com.lugardi.backend.models.Cuenta;
import com.lugardi.backend.repository.CuentaRepository;

@Component
public class CuentaService {
    @Autowired
    CuentaRepository repository;

    public Cuenta guardarCuenta(Cuenta cuenta){
        try {
            return repository.save(cuenta);
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        }
    }
    public Cuenta obtenerCuentaId(String id){
        try {
            return repository.findById(UUID.fromString(id))
            .orElseThrow(()->new ResponseHandlerException("No existe el cuenta con id " + id));
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        } 
    }
    public Cuenta obtenerCuentaId(UUID id){
        try {
            return repository.findById(id)
            .orElseThrow(()->new ResponseHandlerException("No existe el cuenta con id " + id));
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        } 
    }
    public Cuenta editarCuenta(Cuenta cuenta){
        try {
            return repository.save(cuenta);
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        }
    }
    public void eliminarCuentaById(String id){
        try {
            repository.deleteById(UUID.fromString(id));
        } catch (Exception e) {
            throw new ResponseHandlerException("Lo sentimos ocurrion un Error");
        }
    }
    public List<Cuenta> obtenerCuentas(){
        return repository.findAll();
    }
}

package com.lugardi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lugardi.backend.models.Cuenta;
import com.lugardi.backend.services.CuentaService;

@RestController
@RequestMapping("cuenta")
public class CuentaController {

    @Autowired
    CuentaService service;

    @GetMapping
    public ResponseEntity<Cuenta> obtenerCuenta(@RequestParam String id){
        return ResponseEntity.ok(service.obtenerCuentaId(id));
    }

    @GetMapping(path = "/lista")
    public ResponseEntity<List<Cuenta>> obtenerCuentas(){
        return ResponseEntity.ok(service.obtenerCuentas());
    }

    @PostMapping
    public ResponseEntity<Cuenta> crearCuenta(@RequestBody Cuenta cuenta){
        return ResponseEntity.ok(service.guardarCuenta(cuenta));
    }

    @PutMapping
    public ResponseEntity<Cuenta> actualizarCuenta(@RequestBody Cuenta cuenta){
        return ResponseEntity.ok(service.editarCuenta(cuenta));
    }
    @DeleteMapping
    public ResponseEntity<String> eliminarCuenta(@RequestParam String id){
        service.eliminarCuentaById(id);
        return ResponseEntity.ok("Cuenta eliminada con éxito");
    }
}

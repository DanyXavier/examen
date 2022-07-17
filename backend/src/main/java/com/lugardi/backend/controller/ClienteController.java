package com.lugardi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lugardi.backend.models.Cliente;
import com.lugardi.backend.services.ClienteService;
import com.lugardi.backend.services.converter.ClienteConverter;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    ClienteConverter converter;

    @Autowired
    ClienteService service;

    @GetMapping
    public ResponseEntity<Cliente> obtenerClientePorId(@RequestParam String clienId){
        return ResponseEntity.ok(service.obtenerClienteId(clienId));
    }

    @PostMapping
    public ResponseEntity<Cliente> guardarCliente(@RequestBody Cliente cliente){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.guardarCliente(cliente));
    }
    @PutMapping
    public ResponseEntity<Cliente> editarCliente(@RequestBody Cliente cliente){
        return ResponseEntity.ok(service.editarCliente(cliente));
    }
    @DeleteMapping
    public ResponseEntity<String> eliminarCliente(@RequestParam String clienteId){
        service.eliminarClienteById(clienteId);
        return ResponseEntity.ok("Cliente eliminado con Exito");
    }
    @GetMapping(path = "/lista")
    public ResponseEntity<List<Cliente>> obtenerClientes(){
        return ResponseEntity.ok(service.obtenerTodosCliente());
    }
}
package com.lugardi.backend.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lugardi.backend.error.ResponseHandlerException;
import com.lugardi.backend.models.Cliente;
import com.lugardi.backend.repository.ClienteRepositiry;

@Component
public class ClienteService {
    @Autowired
    ClienteRepositiry cRepositiry;

    public List<Cliente> obtenerTodosCliente() {
        try {
            return cRepositiry.findAll();
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        }
    }

    public Cliente guardarCliente(Cliente cliente) {
        try {
            return cRepositiry.save(cliente);
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        }
    }

    public Cliente obtenerClienteId(String id) {
        try {
            return cRepositiry.findById(UUID.fromString(id))
                    .orElseThrow(() -> new ResponseHandlerException("No existe el cliente con id " + id));
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        }
    }

    public Cliente editarCliente(Cliente cliente) {
        try {
            return cRepositiry.save(cliente);
        } catch (Exception e) {
            throw new ResponseHandlerException(e.getMessage());
        }
    }

    public void eliminarClienteById(String id) {
        try {
            cRepositiry.deleteById(UUID.fromString(id));
        } catch (Exception e) {
            throw new ResponseHandlerException("Lo sentimos ocurrion un Error");
        }
    }
}

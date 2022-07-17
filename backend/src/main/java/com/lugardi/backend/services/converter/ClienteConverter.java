package com.lugardi.backend.services.converter;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

import com.lugardi.backend.models.Cliente;
import com.lugardi.backend.models.dto.ClienteDto;

@Component
public class ClienteConverter implements Converter<Cliente,ClienteDto> {
    public ClienteDto convertirClienteADto(Cliente cliente){
        ModelMapper mapper = new ModelMapper();
        mapper.addConverter(new ClienteConverter());
        ClienteDto clienteDto = mapper.map(cliente, ClienteDto.class);
        return clienteDto;
    }

    @Override
    public ClienteDto convert(MappingContext<Cliente, ClienteDto> context) {
        Cliente cliente = context.getSource();
        ClienteDto clienteDto = context.getDestination();
        if (clienteDto == null) {
            clienteDto = new ClienteDto();
        }
        clienteDto.id = cliente.getId();
        clienteDto.direccion = cliente.getDireccion();
        clienteDto.estado = cliente.getEstado();
        clienteDto.nombre = cliente.getNombre();
        clienteDto.password = cliente.getPassword();
        clienteDto.telefono = cliente.getTelefono();
        return clienteDto;
    }
}

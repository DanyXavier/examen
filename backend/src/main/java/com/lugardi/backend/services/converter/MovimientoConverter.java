package com.lugardi.backend.services.converter;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

import com.lugardi.backend.models.Movimiento;
import com.lugardi.backend.models.dto.MovimientoDTO;

@Component
public class MovimientoConverter implements Converter<Movimiento,MovimientoDTO> {

    public MovimientoDTO convertirMovimientoADto(Movimiento movimiento){
        ModelMapper mapper = new ModelMapper();
        mapper.addConverter(new MovimientoConverter());
        MovimientoDTO movimientoDto = mapper.map(movimiento, MovimientoDTO.class);
        return movimientoDto;
    }

    @Override
    public MovimientoDTO convert(MappingContext<Movimiento, MovimientoDTO> context) {
        Movimiento movimiento = context.getSource();
        MovimientoDTO movimientoDTO = context.getDestination();
        if (movimientoDTO == null) {
            movimientoDTO = new MovimientoDTO();
        }
        movimientoDTO.cliente = movimiento.getCuenta().getCliente().getNombre();
        movimientoDTO.estado = movimiento.getCuenta().getEstado();
        movimientoDTO.fecha = movimiento.getFecha();
        movimientoDTO.movimiento = movimiento.getValor();
        movimientoDTO.numeroCuenta = movimiento.getCuenta().getNumeroCuenta();
        movimientoDTO.saldoDisponible = movimiento.getSaldo();
        movimientoDTO.saldoInicial = movimiento.getCuenta().getSaldoInicial();
        movimientoDTO.tipo = movimiento.getCuenta().getTipoCuenta();
        return movimientoDTO;
    }
    
}

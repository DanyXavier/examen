package com.lugardi.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lugardi.backend.models.Movimiento;
import com.lugardi.backend.models.dto.MovimientoDTO;
import com.lugardi.backend.services.MovimientoService;
import com.lugardi.backend.services.PdfService;

@RestController
@RequestMapping("/movimiento")
public class MovimientoController {
    @Autowired
    MovimientoService service;

    @Autowired
    PdfService sPdfService;

    @GetMapping
    public ResponseEntity<Movimiento> obtenerMovimiento(@RequestParam String id){
        return ResponseEntity.ok(service.obtenerMovimientoId(id));
    }
    @GetMapping(path = "/lista")
    public ResponseEntity<List<Movimiento>> obtenerMovimientos(){
        return ResponseEntity.ok(service.obtenerMovimientos());
    }
    @PostMapping
    public ResponseEntity<Movimiento> guardarMovimiento(@RequestBody Movimiento movimiento){
        return ResponseEntity.ok(service.RealizarMovimiento(movimiento));
    }
    @PutMapping
    public ResponseEntity<Movimiento> editarMovimiento(@RequestBody Movimiento movimiento){
        return ResponseEntity.ok(service.editarMovimiento(movimiento));
    }
    @DeleteMapping
    public ResponseEntity<String> eliminarMovimiento(@RequestParam String id){
        service.eliminarMovimientoById(id);
        return ResponseEntity.ok("Movimiento eliminado con éxito");
    }

    @GetMapping(path = "/informe")
    public ResponseEntity<List<MovimientoDTO>> informe(@RequestParam String inicio,@RequestParam String fin,@RequestParam String clienteId){
        List<MovimientoDTO> movimientoDTOs = service.informeMovimientos(inicio, fin, clienteId);
        return ResponseEntity.ok(movimientoDTOs);
    }
    @GetMapping(path = "/informe/pdf")
    public ResponseEntity<Resource> informePdf(@RequestParam String inicio,@RequestParam String fin,@RequestParam String clienteId){
        List<MovimientoDTO> movimientoDTOs = service.informeMovimientos(inicio, fin, clienteId);
        Map<String,Object> data = new HashMap<>();
        data.put("movimientosDTO", movimientoDTOs);
        Resource re = sPdfService.generatePdfFile("reporte", data, "reporte.pdf");
        return ResponseEntity.ok()
        .contentType(MediaType.parseMediaType(MediaType.APPLICATION_PDF_VALUE))
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + re.getFilename() + "\"")
        .body(re);
    }
}

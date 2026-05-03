package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.entity.ProtocoloDECEntity;
import com.example.backend.interfaces.IProtocoloDECService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/entities/protocolo-dec")
public class ProtocoloDECController {

    @Autowired
    private IProtocoloDECService service;

    @GetMapping
    public List<ProtocoloDECEntity> listar() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProtocoloDECEntity> buscarPorId(@PathVariable Long id) {
        ProtocoloDECEntity protocoloDEC = service.findById(id);

        if (protocoloDEC != null) {
            return new ResponseEntity<>(protocoloDEC, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<ProtocoloDECEntity> crear(@RequestBody ProtocoloDECEntity protocoloDEC) {
        ProtocoloDECEntity nuevoProtocoloDEC = service.save(protocoloDEC);
        return new ResponseEntity<>(nuevoProtocoloDEC, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProtocoloDECEntity> actualizar(
            @PathVariable Long id,
            @RequestBody ProtocoloDECEntity protocoloDEC) {

        ProtocoloDECEntity protocoloExistente = service.findById(id);

        if (protocoloExistente != null) {
            protocoloExistente.setFecha(protocoloDEC.getFecha());
            protocoloExistente.setDescripcion(protocoloDEC.getDescripcion());
            protocoloExistente.setCausa(protocoloDEC.getCausa());
            protocoloExistente.setAlumnos(protocoloDEC.getAlumnos());

            ProtocoloDECEntity protocoloActualizado = service.save(protocoloExistente);
            return new ResponseEntity<>(protocoloActualizado, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        ProtocoloDECEntity protocoloDEC = service.findById(id);

        if (protocoloDEC != null) {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
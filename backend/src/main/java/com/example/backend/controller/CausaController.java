package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.entity.CausaEntity;
import com.example.backend.interfaces.ICausaService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/entities/causa")
public class CausaController {

    @Autowired
    private ICausaService service;

    @GetMapping
    public List<CausaEntity> listar() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CausaEntity> buscarPorId(@PathVariable Long id) {
        CausaEntity causa = service.findById(id);

        if (causa != null) {
            return new ResponseEntity<>(causa, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<CausaEntity> crear(@RequestBody CausaEntity causa) {
        CausaEntity nuevaCausa = service.save(causa);
        return new ResponseEntity<>(nuevaCausa, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CausaEntity> actualizar(
            @PathVariable Long id,
            @RequestBody CausaEntity causa) {

        CausaEntity causaExistente = service.findById(id);

        if (causaExistente != null) {
            causaExistente.setNombreCausa(causa.getNombreCausa());

            CausaEntity causaActualizada = service.save(causaExistente);
            return new ResponseEntity<>(causaActualizada, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        CausaEntity causa = service.findById(id);

        if (causa != null) {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
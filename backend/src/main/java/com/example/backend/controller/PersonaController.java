package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.PersonaEntity;
import com.example.demo.interfaces.IPersonaService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/entities/persona")
public class PersonaController{

    @Autowired
    private IPersonaService service;

    @GetMapping
    public List<PersonaEntity> listar() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonaEntity> buscarPorId(@PathVariable Long id) {
        PersonaEntity persona = service.findById(id);
        if (persona != null) {
            return new ResponseEntity<>(persona, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<PersonaEntity> crear(@RequestBody PersonaEntity persona) { // <--- AGREGAR @RequestBody
        System.out.println("Capa Rest recibió: " + persona.getNombre()); // Para que lo veas en consola
        PersonaEntity nuevaPersona = service.save(persona);
        return new ResponseEntity<>(nuevaPersona, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonaEntity> actualizar(@PathVariable Long id, @RequestBody PersonaEntity persona) {
        PersonaEntity personaExistente = service.findById(id);
        if (personaExistente != null) {
            personaExistente.setNombre(persona.getNombre());
            PersonaEntity personaActualizada = service.save(personaExistente);
            return new ResponseEntity<>(personaActualizada, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

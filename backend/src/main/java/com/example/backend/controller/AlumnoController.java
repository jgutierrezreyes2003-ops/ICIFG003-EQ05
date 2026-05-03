package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.entity.AlumnoEntity;
import com.example.backend.interfaces.IAlumnoService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/entities/alumno")
public class AlumnoController {

    @Autowired
    private IAlumnoService service;

    @GetMapping
    public List<AlumnoEntity> listar() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumnoEntity> buscarPorId(@PathVariable Long id) {
        AlumnoEntity alumno = service.findById(id);

        if (alumno != null) {
            return new ResponseEntity<>(alumno, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<AlumnoEntity> crear(@RequestBody AlumnoEntity alumno) {
        AlumnoEntity nuevoAlumno = service.save(alumno);
        return new ResponseEntity<>(nuevoAlumno, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlumnoEntity> actualizar(
            @PathVariable Long id,
            @RequestBody AlumnoEntity alumno) {

        AlumnoEntity alumnoExistente = service.findById(id);

        if (alumnoExistente != null) {
            alumnoExistente.setNombre(alumno.getNombre());
            alumnoExistente.setCurso(alumno.getCurso());

            AlumnoEntity alumnoActualizado = service.save(alumnoExistente);
            return new ResponseEntity<>(alumnoActualizado, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        AlumnoEntity alumno = service.findById(id);

        if (alumno != null) {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.entity.UsuarioEntity;
import com.example.backend.repository.IUsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    @Autowired
    private IUsuarioRepository repository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioEntity credenciales) {
        UsuarioEntity usuarioReal = repository.findByEmailAndClave(credenciales.getEmail(), credenciales.getClave());
        
        if (usuarioReal != null) {
            return ResponseEntity.ok(usuarioReal);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo o contraseña incorrectos");
        }
    }

    // Un método extra para que ustedes puedan registrar usuarios de prueba
    @PostMapping("/registrar")
    public UsuarioEntity registrar(@RequestBody UsuarioEntity nuevoUsuario) {
        return repository.save(nuevoUsuario);
    }
}
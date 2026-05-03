package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.entity.UsuarioEntity;
import com.example.backend.interfaces.IUsuarioService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/auth")
public class UsuarioController {

    @Autowired
    private IUsuarioService service;

    @GetMapping
    public ResponseEntity<String> authInfo() {
        return ResponseEntity.ok("Auth funcionando. Usa POST /api/v1/auth/login para iniciar sesión.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioEntity usuario) {

        UsuarioEntity usuarioValido = service.login(
                usuario.getUsuario(),
                usuario.getContrasena()
        );

        if (usuarioValido != null) {
            return new ResponseEntity<>(usuarioValido, HttpStatus.OK);
        }

        return new ResponseEntity<>("Usuario o contraseña incorrectos", HttpStatus.UNAUTHORIZED);
    }
}
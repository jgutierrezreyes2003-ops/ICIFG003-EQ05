package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.UsuarioEntity;
import com.example.backend.interfaces.IUsuarioService;
import com.example.backend.repository.UsuarioRepository;

@Service
public class UsuarioServiceImpl implements IUsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UsuarioEntity registrar(UsuarioEntity usuario) {
        if (repository.existsByUsuario(usuario.getUsuario())) {
            throw new RuntimeException("El usuario ya existe");
        }

        return repository.save(usuario);
    }

    @Override
    public UsuarioEntity login(String usuario, String contrasena) {
        return repository.findByUsuario(usuario)
                .filter(u -> u.getContrasena().equals(contrasena))
                .orElse(null);
    }

    @Override
    public boolean existeUsuario(String usuario) {
        return repository.existsByUsuario(usuario);
    }
}
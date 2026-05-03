package com.example.backend.interfaces;

import com.example.backend.entity.UsuarioEntity;

public interface IUsuarioService {

    UsuarioEntity registrar(UsuarioEntity usuario);

    UsuarioEntity login(String usuario, String contrasena);

    boolean existeUsuario(String usuario);
}
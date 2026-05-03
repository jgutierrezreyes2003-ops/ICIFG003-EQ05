package com.example.backend.interfaces;

import java.util.List;
import com.example.backend.entity.AlumnoEntity;

public interface IAlumnoService {

    List<AlumnoEntity> findAll();

    AlumnoEntity findById(Long id);

    AlumnoEntity save(AlumnoEntity alumno);

    void deleteById(Long id);
}
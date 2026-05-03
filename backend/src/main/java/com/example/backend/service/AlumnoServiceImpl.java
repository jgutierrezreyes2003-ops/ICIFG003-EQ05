package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.AlumnoEntity;
import com.example.backend.interfaces.IAlumnoService;
import com.example.backend.repository.AlumnoRepository;

@Service
public class AlumnoServiceImpl implements IAlumnoService {

    @Autowired
    private AlumnoRepository repository;

    @Override
    public List<AlumnoEntity> findAll() {
        return repository.findAll();
    }

    @Override
    public AlumnoEntity findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public AlumnoEntity save(AlumnoEntity alumno) {
        return repository.save(alumno);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
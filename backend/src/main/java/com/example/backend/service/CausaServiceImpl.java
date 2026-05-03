package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.CausaEntity;
import com.example.backend.interfaces.ICausaService;
import com.example.backend.repository.CausaRepository;

@Service
public class CausaServiceImpl implements ICausaService {

    @Autowired
    private CausaRepository repository;

    @Override
    public List<CausaEntity> findAll() {
        return repository.findAll();
    }

    @Override
    public CausaEntity findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public CausaEntity save(CausaEntity causa) {
        return repository.save(causa);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
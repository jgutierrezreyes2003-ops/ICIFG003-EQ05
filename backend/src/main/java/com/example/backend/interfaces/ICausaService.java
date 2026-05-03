package com.example.backend.interfaces;

import java.util.List;

import com.example.backend.entity.CausaEntity;

public interface ICausaService {

    List<CausaEntity> findAll();

    CausaEntity findById(Long id);

    CausaEntity save(CausaEntity causa);

    void deleteById(Long id);
}
package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.ProtocoloDECEntity;
import com.example.backend.interfaces.IProtocoloDECService;
import com.example.backend.repository.ProtocoloDECRepository;

@Service
public class ProtocoloDECServiceImpl implements IProtocoloDECService {

    @Autowired
    private ProtocoloDECRepository repository;

    @Override
    public List<ProtocoloDECEntity> findAll() {
        return repository.findAll();
    }

    @Override
    public ProtocoloDECEntity findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public ProtocoloDECEntity save(ProtocoloDECEntity protocoloDEC) {
        return repository.save(protocoloDEC);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
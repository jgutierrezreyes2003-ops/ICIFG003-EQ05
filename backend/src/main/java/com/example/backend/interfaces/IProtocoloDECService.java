package com.example.backend.interfaces;

import java.util.List;

import com.example.backend.entity.ProtocoloDECEntity;

public interface IProtocoloDECService {

    List<ProtocoloDECEntity> findAll();

    ProtocoloDECEntity findById(Long id);

    ProtocoloDECEntity save(ProtocoloDECEntity protocoloDEC);

    void deleteById(Long id);
}
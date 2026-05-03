package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.CausaEntity;

@Repository
public interface CausaRepository extends JpaRepository<CausaEntity, Long> {

}
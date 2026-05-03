package com.example.backend.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "protocolo_dec")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProtocoloDECEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(length = 1000)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "causa_id", nullable = false)
    private CausaEntity causa;

    @ManyToMany
    @JoinTable(
        name = "protocolo_dec_alumno",
        joinColumns = @JoinColumn(name = "protocolo_dec_id"),
        inverseJoinColumns = @JoinColumn(name = "alumno_id")
    )
    private List<AlumnoEntity> alumnos;
}
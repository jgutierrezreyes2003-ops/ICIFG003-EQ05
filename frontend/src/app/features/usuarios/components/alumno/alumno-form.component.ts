import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../models/alumno.models';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './alumno-form.component.html',
  styleUrl: './alumno-form.component.css'
})
export class AlumnoFormComponent implements OnChanges {

  @Input() alumnoEditar: Alumno | null = null;

  @Output() guardar = new EventEmitter<Alumno>();
  @Output() cancelar = new EventEmitter<void>();

  alumno: Alumno = {
    nombre: '',
    curso: ''
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['alumnoEditar'] && this.alumnoEditar) {
      this.alumno = { ...this.alumnoEditar };
    }
  }

  guardarAlumno() {
    if (!this.alumno.nombre || !this.alumno.curso) {
      return;
    }

    this.guardar.emit(this.alumno);
    this.limpiarFormulario(false);
  }

  limpiarFormulario(emitirCancelar: boolean = true) {
    this.alumno = {
      nombre: '',
      curso: ''
    };

    if (emitirCancelar) {
      this.cancelar.emit();
    }
  }

  cancelarEdicion() {
    this.limpiarFormulario();
  }
}
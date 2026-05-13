import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alumno } from '../../models/alumno.models';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno-list.component.html',
  styleUrl: './alumno-list.component.css'
})
export class AlumnoListComponent {

  @Input() alumnos: Alumno[] = [];
  @Input() loading = false;

  @Output() editar = new EventEmitter<Alumno>();
  @Output() eliminar = new EventEmitter<number>();

  alumnoPendienteEliminar: Alumno | null = null;

  editarAlumno(alumno: Alumno) {
    this.editar.emit(alumno);
  }

  solicitarEliminacion(alumno: Alumno) {
    this.alumnoPendienteEliminar = alumno;
  }

  cancelarEliminacion() {
    this.alumnoPendienteEliminar = null;
  }

  confirmarEliminacion() {
    if (this.alumnoPendienteEliminar?.id) {
      this.eliminar.emit(this.alumnoPendienteEliminar.id);
      this.alumnoPendienteEliminar = null;
    }
  }
}
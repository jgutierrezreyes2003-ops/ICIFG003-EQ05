import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoStore } from '../../services/alumno.store';
import { Alumno } from '../../models/alumno.models';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumno-form.component.html',
  styleUrl: './alumno-form.component.css'
})
export class AlumnoFormComponent {
  store = inject(AlumnoStore);

  alumno: Alumno = {
    nombre: '',
    curso: ''
  };

  editando = false;

  constructor() {
    effect(() => {
      const seleccionado = this.store.selected();
      if (seleccionado) {
        this.alumno = { ...seleccionado };
        this.editando = true;
      }
    });
  }

  guardar() {
    if (!this.alumno.nombre.trim() || !this.alumno.curso.trim()) {
      return;
    }

    if (this.editando && this.alumno.id) {
      this.store.update(this.alumno);
    } else {
      this.store.add({
        nombre: this.alumno.nombre,
        curso: this.alumno.curso
      });
    }

    this.limpiar();
  }

  limpiar() {
    this.alumno = {
      nombre: '',
      curso: ''
    };
    this.editando = false;
    this.store.clearSelection();
  }
}

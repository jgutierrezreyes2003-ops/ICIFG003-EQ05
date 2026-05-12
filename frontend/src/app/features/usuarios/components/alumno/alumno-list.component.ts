import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoStore } from '../../services/alumno.store';
import { Alumno } from '../../models/alumno.models';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno-list.component.html',
  styleUrl: './alumno-list.component.css'
})
export class AlumnoListComponent {
  store = inject(AlumnoStore);

  ngOnInit() {
    this.store.load();
  }

  editar(alumno: Alumno) {
    this.store.select(alumno);
  }

  eliminar(id?: number) {
    if (!id) return;

    if (confirm('¿Eliminar alumno?')) {
      this.store.delete(id);
    }
  }
}

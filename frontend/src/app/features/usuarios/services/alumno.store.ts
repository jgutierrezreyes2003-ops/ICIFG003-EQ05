import { Injectable, signal, inject } from '@angular/core';
import { AlumnoService } from './alumno.service';
import { Alumno } from '../models/alumno.models';

@Injectable({
  providedIn: 'root'
})
export class AlumnoStore {
  private service = inject(AlumnoService);

  alumnos = signal<Alumno[]>([]);
  selected = signal<Alumno | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  load() {
    this.loading.set(true);
    this.error.set(null);

    this.service.getAll().subscribe({
      next: data => {
        this.alumnos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar alumnos');
        this.loading.set(false);
      }
    });
  }

  select(alumno: Alumno) {
    this.selected.set({ ...alumno });
  }

  clearSelection() {
    this.selected.set(null);
  }

  add(alumno: Alumno) {
    this.loading.set(true);
    this.error.set(null);

    this.service.create(alumno).subscribe({
      next: nuevo => {
        this.alumnos.update(list => [...list, nuevo]);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al crear alumno');
        this.loading.set(false);
      }
    });
  }

  update(alumno: Alumno) {
    this.loading.set(true);
    this.error.set(null);

    this.service.update(alumno).subscribe({
      next: actualizado => {
        this.alumnos.update(list =>
          list.map(a => a.id === actualizado.id ? actualizado : a)
        );
        this.clearSelection();
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al actualizar alumno');
        this.loading.set(false);
      }
    });
  }

  delete(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.service.delete(id).subscribe({
      next: () => {
        this.alumnos.update(list => list.filter(a => a.id !== id));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al eliminar alumno');
        this.loading.set(false);
      }
    });
  }
}

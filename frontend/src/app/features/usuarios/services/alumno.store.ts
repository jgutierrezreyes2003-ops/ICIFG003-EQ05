import { Injectable, signal } from '@angular/core';
import { Alumno } from '../models/alumno.models';
import { AlumnoService } from './alumno.service';

@Injectable()
export class AlumnoStore {

  alumnos = signal<Alumno[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  selected = signal<Alumno | null>(null);

  private successTimer: any;
  private errorTimer: any;

  constructor(private service: AlumnoService) {
    this.load();
  }

  private mostrarSuccess(mensaje: string) {
    this.success.set(mensaje);
    clearTimeout(this.successTimer);
    this.successTimer = setTimeout(() => this.success.set(null), 3000);
  }

  private mostrarError(mensaje: string) {
    this.error.set(mensaje);
    clearTimeout(this.errorTimer);
    this.errorTimer = setTimeout(() => this.error.set(null), 3000);
  }

  load() {
    this.loading.set(true);

    this.service.getAll().subscribe({
      next: data => {
        this.alumnos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.mostrarError('Error cargando alumnos');
        this.loading.set(false);
      }
    });
  }

  add(alumno: Alumno) {
    this.service.create(alumno).subscribe({
      next: nuevoAlumno => {
        this.alumnos.update(list => [...list, nuevoAlumno]);
        this.mostrarSuccess('Alumno guardado correctamente');
      },
      error: () => {
        this.mostrarError('Error guardando alumno');
      }
    });
  }

  update(alumno: Alumno) {
    this.service.update(alumno).subscribe({
      next: alumnoActualizado => {
        this.alumnos.update(list =>
          list.map(a => a.id === alumnoActualizado.id ? alumnoActualizado : a)
        );

        this.clearSelection();
        this.mostrarSuccess('Alumno actualizado correctamente');
      },
      error: () => {
        this.mostrarError('Error actualizando alumno');
      }
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.alumnos.update(list =>
          list.filter(a => a.id !== id)
        );

        this.mostrarSuccess('Alumno eliminado correctamente');
      },
      error: () => {
        this.mostrarError('Error eliminando alumno');
      }
    });
  }

  select(alumno: Alumno) {
    this.selected.set(alumno);
  }

  clearSelection() {
    this.selected.set(null);
  }
}
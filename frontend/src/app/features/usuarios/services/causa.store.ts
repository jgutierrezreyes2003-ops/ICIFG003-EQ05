import { Injectable, signal } from '@angular/core';
import { Causa } from '../models/causa.models';
import { CausaService } from './causa.service';

@Injectable()
export class CausaStore {

  causas = signal<Causa[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  selected = signal<Causa | null>(null);

  private successTimer: any;
  private errorTimer: any;

  constructor(private service: CausaService) {
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
        this.causas.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.mostrarError('Error cargando causas');
        this.loading.set(false);
      }
    });
  }

  add(causa: Causa) {
    this.service.create(causa).subscribe({
      next: nuevaCausa => {
        this.causas.update(list => [...list, nuevaCausa]);
        this.mostrarSuccess('Causa guardada correctamente');
      },
      error: () => {
        this.mostrarError('Error guardando causa');
      }
    });
  }

  update(causa: Causa) {
    this.service.update(causa).subscribe({
      next: causaActualizada => {
        this.causas.update(list =>
          list.map(c => c.id === causaActualizada.id ? causaActualizada : c)
        );

        this.clearSelection();
        this.mostrarSuccess('Causa actualizada correctamente');
      },
      error: () => {
        this.mostrarError('Error actualizando causa');
      }
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.causas.update(list =>
          list.filter(c => c.id !== id)
        );

        this.mostrarSuccess('Causa eliminada correctamente');
      },
      error: () => {
        this.mostrarError('Error eliminando causa');
      }
    });
  }

  select(causa: Causa) {
    this.selected.set(causa);
  }

  clearSelection() {
    this.selected.set(null);
  }
}
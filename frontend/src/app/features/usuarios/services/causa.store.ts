import { Injectable, signal, inject } from '@angular/core';
import { CausaService } from './causa.service';
import { Causa } from '../models/causa.models';

@Injectable({
  providedIn: 'root'
})
export class CausaStore {
  private causaService = inject(CausaService);

  causas = signal<Causa[]>([]);
  selected = signal<Causa | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);


  load() {
    this.loading.set(true);
    this.error.set(null);
    
    this.causaService.getAll().subscribe({
      next: (data) => {
        this.causas.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al cargar', err);
        this.error.set('No se pudieron cargar las causas desde el servidor.');
        this.loading.set(false);
      }
    });
  }

  add(causa: Causa) {
    this.loading.set(true);
    this.error.set(null);

    this.causaService.create(causa).subscribe({
      next: (causaCreada) => {
        this.causas.update(actuales => [...actuales, causaCreada]);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al guardar', err);
        this.error.set('Hubo un error al guardar la causa.');
        this.loading.set(false);
      }
    });
  }

  update(causa: Causa) {
    if (!causa.id) return;
    
    this.loading.set(true);
    this.error.set(null);

    this.causaService.update(causa.id, causa).subscribe({
      next: (causaActualizada) => {
        this.causas.update(actuales => 
          actuales.map(c => c.id === causaActualizada.id ? causaActualizada : c)
        );
        this.loading.set(false);
        this.clearSelection(); 
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        this.error.set('Hubo un error al actualizar la causa.');
        this.loading.set(false);
      }
    });
  }

  delete(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.causaService.delete(id).subscribe({
      next: () => {
        this.causas.update(actuales => actuales.filter(c => c.id !== id));
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error al eliminar', err);
        this.error.set('Hubo un error al eliminar la causa.');
        this.loading.set(false);
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
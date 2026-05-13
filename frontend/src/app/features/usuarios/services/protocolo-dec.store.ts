import { Injectable, signal } from '@angular/core';

import { ProtocoloDEC } from '../models/protocolo-dec.models';
import { Alumno } from '../models/alumno.models';
import { Causa } from '../models/causa.models';

import { ProtocoloDecService } from './protocolo-dec.service';
import { AlumnoService } from './alumno.service';
import { CausaService } from './causa.service';

@Injectable()
export class ProtocoloDecStore {

  protocolos = signal<ProtocoloDEC[]>([]);
  alumnos = signal<Alumno[]>([]);
  causas = signal<Causa[]>([]);

  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  selected = signal<ProtocoloDEC | null>(null);

  private successTimer: any;
  private errorTimer: any;

  constructor(
    private protocoloService: ProtocoloDecService,
    private alumnoService: AlumnoService,
    private causaService: CausaService
  ) {
    this.load();
    this.loadAlumnos();
    this.loadCausas();
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

    this.protocoloService.getAll().subscribe({
      next: data => {
        this.protocolos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.mostrarError('Error cargando protocolos DEC');
        this.loading.set(false);
      }
    });
  }

  loadAlumnos() {
    this.alumnoService.getAll().subscribe({
      next: data => this.alumnos.set(data),
      error: () => this.mostrarError('Error cargando alumnos')
    });
  }

  loadCausas() {
    this.causaService.getAll().subscribe({
      next: data => this.causas.set(data),
      error: () => this.mostrarError('Error cargando causas')
    });
  }

  add(protocolo: ProtocoloDEC) {
    this.protocoloService.create(protocolo).subscribe({
      next: nuevoProtocolo => {
        this.protocolos.update(list => [...list, nuevoProtocolo]);
        this.mostrarSuccess('Protocolo DEC guardado correctamente');
      },
      error: () => {
        this.mostrarError('Error guardando protocolo DEC');
      }
    });
  }

  update(protocolo: ProtocoloDEC) {
    this.protocoloService.update(protocolo).subscribe({
      next: protocoloActualizado => {
        this.protocolos.update(list =>
          list.map(p => p.id === protocoloActualizado.id ? protocoloActualizado : p)
        );

        this.clearSelection();
        this.mostrarSuccess('Protocolo DEC actualizado correctamente');
      },
      error: () => {
        this.mostrarError('Error actualizando protocolo DEC');
      }
    });
  }

  delete(id: number) {
    this.protocoloService.delete(id).subscribe({
      next: () => {
        this.protocolos.update(list =>
          list.filter(p => p.id !== id)
        );

        this.mostrarSuccess('Protocolo DEC eliminado correctamente');
      },
      error: () => {
        this.mostrarError('Error eliminando protocolo DEC');
      }
    });
  }

  select(protocolo: ProtocoloDEC) {
    this.selected.set(protocolo);
  }

  clearSelection() {
    this.selected.set(null);
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Alumno, Causa, ProtocoloDEC } from '../models/protocolo-dec.models';
import { ProtocoloDECService } from './protocolo-dec.service';

@Injectable({
  providedIn: 'root'
})
export class ProtocoloDECStore {
  private protocolosSubject = new BehaviorSubject<ProtocoloDEC[]>([]);
  protocolos$ = this.protocolosSubject.asObservable();

  private alumnosSubject = new BehaviorSubject<Alumno[]>([]);
  alumnos$ = this.alumnosSubject.asObservable();

  private causasSubject = new BehaviorSubject<Causa[]>([]);
  causas$ = this.causasSubject.asObservable();

  constructor(private service: ProtocoloDECService) {}

  cargarDatos(): void {
    forkJoin({
      protocolos: this.service.listarProtocolos(),
      alumnos: this.service.listarAlumnos(),
      causas: this.service.listarCausas()
    }).subscribe({
      next: ({ protocolos, alumnos, causas }) => {
        this.protocolosSubject.next(protocolos);
        this.alumnosSubject.next(alumnos);
        this.causasSubject.next(causas);
      },
      error: error => console.error('Error al cargar datos de Protocolo DEC', error)
    });
  }

  guardar(protocolo: ProtocoloDEC): void {
    const request = protocolo.id
      ? this.service.actualizarProtocolo(protocolo.id, protocolo)
      : this.service.crearProtocolo(protocolo);

    request.subscribe({
      next: () => this.cargarDatos(),
      error: error => console.error('Error al guardar protocolo DEC', error)
    });
  }

  eliminar(id: number): void {
    this.service.eliminarProtocolo(id).subscribe({
      next: () => this.cargarDatos(),
      error: error => console.error('Error al eliminar protocolo DEC', error)
    });
  }
}

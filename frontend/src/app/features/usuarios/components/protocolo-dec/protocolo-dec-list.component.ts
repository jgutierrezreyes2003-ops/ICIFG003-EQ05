import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProtocoloDEC } from '../../models/protocolo-dec.models';

@Component({
  selector: 'app-protocolo-dec-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './protocolo-dec-list.component.html',
  styleUrl: './protocolo-dec-list.component.css'
})
export class ProtocoloDecListComponent {

  @Input() protocolos: ProtocoloDEC[] = [];
  @Input() loading = false;

  @Output() editar = new EventEmitter<ProtocoloDEC>();
  @Output() eliminar = new EventEmitter<number>();

  busqueda = '';
  protocoloPendienteEliminar: ProtocoloDEC | null = null;

  get protocolosFiltrados(): ProtocoloDEC[] {
    const texto = this.busqueda.trim().toLowerCase();

    if (!texto) {
      return this.protocolos;
    }

    return this.protocolos.filter(protocolo =>
      protocolo.alumnos?.some(alumno =>
        alumno.nombre.toLowerCase().includes(texto) ||
        alumno.curso.toLowerCase().includes(texto)
      )
    );
  }

  editarProtocolo(protocolo: ProtocoloDEC) {
    this.editar.emit(protocolo);
  }

  solicitarEliminacion(protocolo: ProtocoloDEC) {
    this.protocoloPendienteEliminar = protocolo;
  }

  cancelarEliminacion() {
    this.protocoloPendienteEliminar = null;
  }

  confirmarEliminacion() {
    if (this.protocoloPendienteEliminar?.id) {
      this.eliminar.emit(this.protocoloPendienteEliminar.id);
      this.protocoloPendienteEliminar = null;
    }
  }

  nombresAlumnos(protocolo: ProtocoloDEC): string {
    return protocolo.alumnos?.map(a => a.nombre).join(', ') || 'Sin alumnos';
  }
}
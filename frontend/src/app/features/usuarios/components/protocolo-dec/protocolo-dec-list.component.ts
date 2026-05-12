import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProtocoloDEC } from '../../models/protocolo-dec.models';

@Component({
  selector: 'app-protocolo-dec-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './protocolo-dec-list.component.html',
  styleUrl: './protocolo-dec-list.component.css'
})
export class ProtocoloDECListComponent {
  @Input() protocolos: ProtocoloDEC[] = [];
  @Output() editar = new EventEmitter<ProtocoloDEC>();
  @Output() eliminar = new EventEmitter<number>();

  busquedaAlumno = '';

  get protocolosFiltrados(): ProtocoloDEC[] {
    const texto = this.busquedaAlumno.trim().toLowerCase();

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

  confirmarEliminar(id?: number): void {
    if (!id) return;

    const confirmar = confirm('¿Seguro que deseas eliminar este protocolo DEC?');
    if (confirmar) {
      this.eliminar.emit(id);
    }
  }

  nombresAlumnos(protocolo: ProtocoloDEC): string {
    return protocolo.alumnos?.map(a => `${a.nombre} (${a.curso})`).join(', ') || 'Sin alumnos';
  }
}

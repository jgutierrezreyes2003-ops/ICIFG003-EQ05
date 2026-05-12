import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Alumno, Causa, ProtocoloDEC } from '../../models/protocolo-dec.models';

@Component({
  selector: 'app-protocolo-dec-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './protocolo-dec-form.component.html',
  styleUrl: './protocolo-dec-form.component.css'
})
export class ProtocoloDECFormComponent implements OnChanges {
  @Input() protocoloSeleccionado: ProtocoloDEC | null = null;
  @Input() alumnos: Alumno[] = [];
  @Input() causas: Causa[] = [];
  @Output() guardar = new EventEmitter<ProtocoloDEC>();
  @Output() cancelar = new EventEmitter<void>();

  id?: number;
  fecha = '';
  descripcion = '';
  causaId: number | null = null;
  alumnoIds: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['protocoloSeleccionado']) {
      this.cargarFormulario();
    }
  }

  cargarFormulario(): void {
    if (!this.protocoloSeleccionado) {
      this.limpiar();
      return;
    }

    this.id = this.protocoloSeleccionado.id;
    this.fecha = this.protocoloSeleccionado.fecha;
    this.descripcion = this.protocoloSeleccionado.descripcion;
    this.causaId = this.protocoloSeleccionado.causa?.id ?? null;
    this.alumnoIds = this.protocoloSeleccionado.alumnos?.map(a => a.id) ?? [];
  }

  cambiarAlumno(alumnoId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.alumnoIds = [...this.alumnoIds, alumnoId];
    } else {
      this.alumnoIds = this.alumnoIds.filter(id => id !== alumnoId);
    }
  }

  estaSeleccionado(alumnoId: number): boolean {
    return this.alumnoIds.includes(alumnoId);
  }

  enviarFormulario(): void {
    if (!this.fecha || !this.descripcion.trim() || !this.causaId || this.alumnoIds.length === 0) {
      alert('Completa fecha, descripción, causa y al menos un alumno.');
      return;
    }

    const causa = this.causas.find(c => c.id === Number(this.causaId));
    const alumnosSeleccionados = this.alumnos.filter(a => this.alumnoIds.includes(a.id));

    if (!causa) {
      alert('Selecciona una causa válida.');
      return;
    }

    this.guardar.emit({
      id: this.id,
      fecha: this.fecha,
      descripcion: this.descripcion.trim(),
      causa,
      alumnos: alumnosSeleccionados
    });

    this.limpiar();
  }

  limpiar(): void {
    this.id = undefined;
    this.fecha = '';
    this.descripcion = '';
    this.causaId = null;
    this.alumnoIds = [];
  }

  cancelarEdicion(): void {
    this.limpiar();
    this.cancelar.emit();
  }
}

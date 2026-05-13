import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProtocoloDEC } from '../../models/protocolo-dec.models';
import { Alumno } from '../../models/alumno.models';
import { Causa } from '../../models/causa.models';

@Component({
  selector: 'app-protocolo-dec-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './protocolo-dec-form.component.html',
  styleUrl: './protocolo-dec-form.component.css'
})
export class ProtocoloDecFormComponent implements OnChanges {

  @Input() protocoloEditar: ProtocoloDEC | null = null;
  @Input() alumnos: Alumno[] = [];
  @Input() causas: Causa[] = [];

  @Output() guardar = new EventEmitter<ProtocoloDEC>();
  @Output() cancelar = new EventEmitter<void>();

  fecha = '';
  descripcion = '';
  causaId: number | null = null;
  alumnosSeleccionados: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['protocoloEditar'] && this.protocoloEditar) {
      this.fecha = this.protocoloEditar.fecha;
      this.descripcion = this.protocoloEditar.descripcion;
      this.causaId = this.protocoloEditar.causa?.id ?? null;
      this.alumnosSeleccionados = this.protocoloEditar.alumnos?.map(a => a.id!) ?? [];
    }
  }

  alumnoMarcado(id: number | undefined): boolean {
    if (!id) {
      return false;
    }

    return this.alumnosSeleccionados.includes(id);
  }

  cambiarAlumno(alumno: Alumno, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;

    if (!alumno.id) {
      return;
    }

    if (checked) {
      this.alumnosSeleccionados.push(alumno.id);
    } else {
      this.alumnosSeleccionados = this.alumnosSeleccionados.filter(id => id !== alumno.id);
    }
  }

  guardarProtocolo() {
    if (!this.fecha || !this.descripcion || !this.causaId || this.alumnosSeleccionados.length === 0) {
      return;
    }

    const causaSeleccionada = this.causas.find(c => c.id === Number(this.causaId));

    const alumnosElegidos = this.alumnos.filter(a =>
      a.id && this.alumnosSeleccionados.includes(a.id)
    );

    if (!causaSeleccionada) {
      return;
    }

    const protocolo: ProtocoloDEC = {
      id: this.protocoloEditar?.id,
      fecha: this.fecha,
      descripcion: this.descripcion,
      causa: causaSeleccionada,
      alumnos: alumnosElegidos
    };

    this.guardar.emit(protocolo);
    this.limpiarFormulario(false);
  }

  limpiarFormulario(emitirCancelar: boolean = true) {
    this.fecha = '';
    this.descripcion = '';
    this.causaId = null;
    this.alumnosSeleccionados = [];

    if (emitirCancelar) {
      this.cancelar.emit();
    }
  }

  cancelarEdicion() {
    this.limpiarFormulario();
  }
}
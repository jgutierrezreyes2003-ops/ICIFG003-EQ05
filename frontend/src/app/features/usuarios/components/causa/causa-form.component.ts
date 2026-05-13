import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Causa } from '../../models/causa.models';

@Component({
  selector: 'app-causa-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './causa-form.component.html',
  styleUrl: './causa-form.component.css'
})
export class CausaFormComponent implements OnChanges {

  @Input() causaEditar: Causa | null = null;

  @Output() guardar = new EventEmitter<Causa>();
  @Output() cancelar = new EventEmitter<void>();

  causa: Causa = {
    nombreCausa: ''
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['causaEditar'] && this.causaEditar) {
      this.causa = { ...this.causaEditar };
    }
  }

  guardarCausa() {
    if (!this.causa.nombreCausa) {
      return;
    }

    this.guardar.emit(this.causa);
    this.limpiarFormulario(false);
  }

  limpiarFormulario(emitirCancelar: boolean = true) {
    this.causa = {
      nombreCausa: ''
    };

    if (emitirCancelar) {
      this.cancelar.emit();
    }
  }

  cancelarEdicion() {
    this.limpiarFormulario();
  }
}
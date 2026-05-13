import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Causa } from '../../models/causa.models';

@Component({
  selector: 'app-causa-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './causa-list.component.html',
  styleUrl: './causa-list.component.css'
})
export class CausaListComponent {

  @Input() causas: Causa[] = [];
  @Input() loading = false;

  @Output() editar = new EventEmitter<Causa>();
  @Output() eliminar = new EventEmitter<number>();

  causaPendienteEliminar: Causa | null = null;

  editarCausa(causa: Causa) {
    this.editar.emit(causa);
  }

  solicitarEliminacion(causa: Causa) {
    this.causaPendienteEliminar = causa;
  }

  cancelarEliminacion() {
    this.causaPendienteEliminar = null;
  }

  confirmarEliminacion() {
    if (this.causaPendienteEliminar?.id) {
      this.eliminar.emit(this.causaPendienteEliminar.id);
      this.causaPendienteEliminar = null;
    }
  }
}
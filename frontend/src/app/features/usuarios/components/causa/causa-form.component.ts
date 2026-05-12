import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CausaStore } from '../../services/causa.store'; 
import { Causa } from '../../models/causa.models';

@Component({
  selector: 'app-causa-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './causa-form.component.html',
  styleUrl: './causa-form.component.css'
})
export class CausaFormComponent {
  store = inject(CausaStore);

  causa: Causa = {
    nombreCausa: ''
  };

  editando = false;

  constructor() {
    effect(() => {
      const seleccionado = this.store.selected();
      if (seleccionado) {
        this.causa = { ...seleccionado };
        this.editando = true;
      }
    });
  }

  guardar() {
    if (!this.causa.nombreCausa.trim()) {
      return;
    }

    if (this.editando && this.causa.id) {
      this.store.update(this.causa);
    } else {
      this.store.add({
        nombreCausa: this.causa.nombreCausa
      });
    }

    this.limpiar();
  }

  limpiar() {
    this.causa = {
      nombreCausa: ''
    };
    this.editando = false;
    this.store.clearSelection();
  }
}
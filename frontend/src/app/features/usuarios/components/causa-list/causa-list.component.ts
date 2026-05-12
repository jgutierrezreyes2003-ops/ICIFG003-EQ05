import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CausaService } from '../../services/causa.service';
import { Causa } from '../../models/causa.models';

@Component({
  selector: 'app-causa-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './causa-list.component.html',
  styleUrl: './causa-list.component.css'
})
export class CausaListComponent implements OnInit {
  private causaService = inject(CausaService);
  private cdr = inject(ChangeDetectorRef);
  causas: Causa[] = [];

  mostrarFormulario = false;
  nuevoNombreCausa = '';
  causaEditando: Causa | null = null;

  ngOnInit() {
    this.cargarCausas();
  }

  cargarCausas() {
    this.causaService.getAll().subscribe({
      next: (data) => {
        this.causas = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar', err)
    });
  }

  toggleForm() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.nuevoNombreCausa = '';
      this.causaEditando = null;
    }
    this.cdr.detectChanges();
  }

  iniciarEdicion(causa: Causa) {
    this.causaEditando = causa;
    this.nuevoNombreCausa = causa.nombreCausa;
    this.mostrarFormulario = true;
    this.cdr.detectChanges();
  }

  guardar() {
    if (!this.nuevoNombreCausa.trim()) {
      alert('Debes escribir una descripción para la causa.');
      return;
    }

    const causaDatos: Causa = { nombreCausa: this.nuevoNombreCausa };

    if (this.causaEditando && this.causaEditando.id) {
      this.causaService.update(this.causaEditando.id, causaDatos).subscribe({
        next: (causaActualizada) => {
          const index = this.causas.findIndex(c => c.id === this.causaEditando!.id);
          if (index !== -1) {
            this.causas[index] = causaActualizada;
          }
          this.toggleForm();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al actualizar', err);
          alert('Hubo un error al actualizar la base de datos.');
        }
      });
    } else {
      this.causaService.create(causaDatos).subscribe({
        next: (causaCreada) => {
          this.causas = [...this.causas, causaCreada]; 
          this.toggleForm();
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Error al guardar', err)
      });
    }
  }
  eliminar(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar esta causa?')) {
      this.causaService.delete(id).subscribe({
        next: () => {
          this.causas = this.causas.filter(c => c.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }
}
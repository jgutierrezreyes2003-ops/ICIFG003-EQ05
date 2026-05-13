import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CausaStore } from '../services/causa.store';
import { CausaFormComponent } from '../components/causa/causa-form.component';
import { CausaListComponent } from '../components/causa/causa-list.component';

@Component({
  selector: 'app-causa-page',
  standalone: true,
  imports: [
    CommonModule,
    CausaFormComponent,
    CausaListComponent
  ],
  providers: [CausaStore],
  template: `
    <div class="bg-light min-vh-100">

      <nav class="navbar navbar-expand-lg bg-colegio-blue shadow py-3 px-4 border-bottom border-warning border-3">
        <div class="container-fluid d-flex justify-content-between align-items-center">

          <div class="d-flex align-items-center gap-3">
            <div
              class="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center shadow-sm"
              style="width: 50px; height: 50px;">
              <img
                src="/Logo.png"
                alt="Logo"
                class="img-fluid"
                style="max-height: 35px; object-fit: contain;">
            </div>

            <h4 class="mb-0 text-white fw-bold d-none d-sm-block">
              Colegio Marcela Paz
            </h4>
          </div>

          <div class="d-flex align-items-center gap-3">
            <button
              class="btn btn-outline-light btn-sm fw-bold rounded-pill px-4 py-2"
              (click)="volver()">
              Volver
            </button>

            <button
              class="btn btn-outline-light btn-sm fw-bold rounded-pill px-4 py-2"
              (click)="salir()">
              Cerrar Sesión
            </button>
          </div>

        </div>
      </nav>

      <main class="container py-5">

        <div class="mb-4 border-bottom pb-3">
          <h2 class="fw-bold text-colegio-blue mb-2">
            Gestión de Causas
          </h2>
          <p class="text-secondary mb-0">
            Administración de los motivos de desregulación para el protocolo DEC.
          </p>
        </div>

        @if (store.success()) {
          <div class="alert alert-success text-center rounded-4 shadow-sm">
            {{ store.success() }}
          </div>
        }

        @if (store.error()) {
          <div class="alert alert-danger text-center rounded-4 shadow-sm">
            {{ store.error() }}
          </div>
        }

        <div class="row g-4">

          <div class="col-12">
            <app-causa-form
              [causaEditar]="store.selected()"
              (guardar)="store.selected() ? store.update($event) : store.add($event)"
              (cancelar)="store.clearSelection()">
            </app-causa-form>
          </div>

          <div class="col-12">
            <app-causa-list
              [causas]="store.causas()"
              [loading]="store.loading()"
              (editar)="store.select($event)"
              (eliminar)="store.delete($event)">
            </app-causa-list>
          </div>

        </div>

      </main>

    </div>
  `
})
export class CausaPageComponent {
  store = inject(CausaStore);
  private router = inject(Router);

  volver() {
    this.router.navigate(['/inicio']);
  }

  salir() {
    this.router.navigate(['/login']);
  }
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CausaFormComponent } from '../components/causa/causa-form.component';
import { CausaListComponent } from '../components/causa/causa-list.component';

@Component({
  selector: 'app-causa-page',
  standalone: true,
  imports: [CommonModule, CausaFormComponent, CausaListComponent],
  template: `
    <div class="bg-light min-vh-100">
      
      <nav class="navbar navbar-expand-lg bg-colegio-blue shadow py-3 px-4 border-bottom border-warning border-3">
        <div class="container-fluid d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <div class="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center shadow-sm" style="width: 50px; height: 50px;">
              <img src="/Logo.png" alt="Logo" class="img-fluid" style="max-height: 35px; object-fit: contain;">
            </div>
            <h4 class="mb-0 text-white fw-bold d-none d-sm-block">Colegio Marcela Paz</h4>
          </div>

          <div class="d-flex align-items-center gap-3">
            <button class="btn btn-outline-light btn-sm fw-bold rounded-pill px-4 py-2" (click)="volver()">
              Volver
            </button>
            <button class="btn btn-outline-light btn-sm fw-bold rounded-pill px-4 py-2" (click)="salir()">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <main class="container py-5 mt-3">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 border-bottom border-secondary-subtle pb-4">
          <div>
            <h2 class="fw-bold text-colegio-blue mb-2 display-6">Gestión de Causas</h2>
            <p class="text-secondary mb-0 fs-5">Administración de los motivos de desregulación para el protocolo DEC.</p>
          </div>
        </div>

        <app-causa-form></app-causa-form>
        <app-causa-list></app-causa-list>
      </main>
      
    </div>
  `,
  styles: [`
    .text-colegio-blue { color: #003f7a !important; }
    .bg-colegio-blue { background-color: #003f7a !important; }
  `]
})
export class CausaPageComponent {
  constructor(private router: Router) {}

  volver() {
    this.router.navigate(['/inicio']);
  }

  salir() {
    this.router.navigate(['/']);
  }
}
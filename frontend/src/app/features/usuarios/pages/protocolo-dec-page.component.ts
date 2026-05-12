import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProtocoloDEC } from '../models/protocolo-dec.models';
import { ProtocoloDECFormComponent } from '../components/protocolo-dec/protocolo-dec-form.component';
import { ProtocoloDECListComponent } from '../components/protocolo-dec/protocolo-dec-list.component';
import { ProtocoloDECStore } from '../services/protocolo-dec.store';

@Component({
  selector: 'app-protocolo-dec-page',
  standalone: true,
  imports: [CommonModule, ProtocoloDECFormComponent, ProtocoloDECListComponent],
  template: `
    <div class="bg-light min-vh-100">
      <nav class="navbar navbar-expand-lg bg-colegio-blue shadow py-3 px-4 border-bottom border-warning border-3">
        <div class="container-fluid d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-3">
            <div class="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center shadow-sm logo-box">
              <img src="/Logo.png" alt="Logo" class="img-fluid logo-img">
            </div>
            <h4 class="mb-0 text-white fw-bold d-none d-sm-block">Colegio Marcela Paz</h4>
          </div>

          <div class="d-flex align-items-center gap-3">
            <button class="btn btn-outline-light btn-sm fw-bold rounded-pill px-4 py-2" (click)="volver()">
              Volver
            </button>
          </div>
        </div>
      </nav>

      <main class="container py-5 mt-3">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 border-bottom border-secondary-subtle pb-4">
          <div>
            <h2 class="fw-bold text-colegio-blue mb-2 display-6">Módulo Protocolo DEC</h2>
            <p class="text-secondary mb-0 fs-5">Registra, edita, elimina y busca protocolos por alumno involucrado.</p>
          </div>
        </div>

        <app-protocolo-dec-form
          [protocoloSeleccionado]="protocoloSeleccionado"
          [alumnos]="(store.alumnos$ | async) || []"
          [causas]="(store.causas$ | async) || []"
          (guardar)="guardar($event)"
          (cancelar)="protocoloSeleccionado = null">
        </app-protocolo-dec-form>

        <app-protocolo-dec-list
          [protocolos]="(store.protocolos$ | async) || []"
          (editar)="editar($event)"
          (eliminar)="eliminar($event)">
        </app-protocolo-dec-list>
      </main>
    </div>
  `,
  styles: [`
    .bg-colegio-blue { background-color: #003f7d; }
    .text-colegio-blue { color: #003f7d; }
    .logo-box { width: 50px; height: 50px; }
    .logo-img { max-height: 35px; object-fit: contain; }
  `]
})
export class ProtocoloDECPageComponent implements OnInit {
  protocoloSeleccionado: ProtocoloDEC | null = null;

  constructor(public store: ProtocoloDECStore, private router: Router) {}

  ngOnInit(): void {
    this.store.cargarDatos();
  }

  guardar(protocolo: ProtocoloDEC): void {
    this.store.guardar(protocolo);
    this.protocoloSeleccionado = null;
  }

  editar(protocolo: ProtocoloDEC): void {
    this.protocoloSeleccionado = protocolo;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminar(id: number): void {
    this.store.eliminar(id);
  }

  volver(): void {
    this.router.navigate(['/inicio']);
  }
}

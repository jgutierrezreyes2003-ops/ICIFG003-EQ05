import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioStore } from '../services/usuario.store';
import { UsuarioFormComponent } from '../components/usuario/usuario-form.component';
import { UsuarioListComponent } from '../components/usuario/usuario-list.component';

@Component({
  selector: 'app-usuario-page',
  standalone: true,
  imports: [
    CommonModule,
    UsuarioFormComponent,
    UsuarioListComponent
  ],
  providers: [UsuarioStore],
  template: `
    @if (store.success()) {
      <div class="alert alert-success text-center m-3">
        {{ store.success() }}
      </div>
    }

    @if (store.error()) {
      <div class="alert alert-danger text-center m-3">
        {{ store.error() }}
      </div>
    }

    <div class="container py-4">
      <h1 class="mb-4">Gestión de Usuarios</h1>

      <div class="row">
        <div class="col-md-5 mb-4">
          <app-usuario-form></app-usuario-form>
        </div>

        <div class="col-md-7">
          <app-usuario-list></app-usuario-list>
        </div>
      </div>
    </div>
  `
})
export class UsuarioPageComponent {
  store = inject(UsuarioStore);
}
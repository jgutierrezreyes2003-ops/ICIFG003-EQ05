import { Routes } from '@angular/router';
import { HomeComponent } from './features/usuarios/pages/home/home.component';
import { UsuarioFormComponent } from './features/usuarios/components/usuario/usuario-form.component';
import { InicioComponent } from './features/usuarios/components/inicio/inicio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UsuarioFormComponent },
  { path: 'inicio', component: InicioComponent },

  {
    path: 'alumnos',
    loadChildren: () =>
      import('./features/usuarios/alumno.routes').then(m => m.ALUMNO_ROUTES)
  },

  {
    path: 'protocolo-dec',
    loadChildren: () =>
      import('./features/usuarios/protocolo-dec.routes').then(m => m.PROTOCOLO_DEC_ROUTES)
  },

  {
    path: 'causas',
    loadChildren: () =>
      import('./features/usuarios/causa.routes').then(m => m.CAUSA_ROUTES)
  },

  { path: '**', redirectTo: '' }
];
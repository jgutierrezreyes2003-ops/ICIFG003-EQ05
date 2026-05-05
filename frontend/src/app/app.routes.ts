import { Routes } from '@angular/router';
import { HomeComponent } from './features/usuarios/pages/home/home.component';
import { UsuarioFormComponent } from './features/usuarios/components/usuario/usuario-form.component'; 
import { InicioComponent } from './features/usuarios/components/inicio/inicio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: UsuarioFormComponent },
  { path: 'inicio', component: InicioComponent },
  { path: '**', redirectTo: '' }
];
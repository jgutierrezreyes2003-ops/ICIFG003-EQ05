import { Routes } from '@angular/router';
import { UsuarioFormComponent } from './features/usuarios/components/usuario/usuario-form.component'; 
import { InicioComponent } from './features/usuarios/components/inicio/inicio.component';

export const routes: Routes = [

  { path: '', component: UsuarioFormComponent }, 
  { path: 'inicio', component: InicioComponent },  
  { path: '**', redirectTo: '' }
];
import { Component } from '@angular/core';
import { UsuarioListComponent } from '../components/usuario-list.component';
import { UsuarioFormComponent } from '../components/usuario-form.component';
@Component({
    selector: 'app-usuario-page',
    standalone: true,
    imports: [UsuarioListComponent, UsuarioFormComponent],
    template: `
<h1>Gestión de Usuarios</h1>
<app-usuario-form></app-usuario-form>
<app-usuario-list></app-usuario-list>
`
})
export class UsuarioPageComponent { }
import { Component } from '@angular/core';
import { PersonaListComponent } from '../components/persona-list.component';
import { PersonaFormComponent } from '../components/persona-form.component';
@Component({
    selector: 'app-persona-page',
    standalone: true,
    imports: [PersonaListComponent, PersonaFormComponent],
    template: `
<h1>Gestión de Personas</h1>
<app-persona-form></app-persona-form>
<app-persona-list></app-persona-list>
`
})
export class PersonaPageComponent { }
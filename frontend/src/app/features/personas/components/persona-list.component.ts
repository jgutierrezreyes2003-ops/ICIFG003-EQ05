import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaStore } from '../services/persona.store';
@Component({
selector: 'app-persona-list',
standalone: true,
imports: [CommonModule],
templateUrl: './persona-list.component.html'
})
export class PersonaListComponent {
store = inject(PersonaStore);
ngOnInit() {
this.store.load();
}
editar(persona: any) {
this.store.select(persona);
}
eliminar(id: number) {
if (confirm('¿Eliminar persona?')) {
this.store.delete(id);
}
}
}
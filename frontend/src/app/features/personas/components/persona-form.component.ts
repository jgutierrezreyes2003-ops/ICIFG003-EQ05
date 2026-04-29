import { Component, inject, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PersonaStore } from '../services/persona.store';
@Component({
selector: 'app-persona-form',
standalone: true,
imports: [ReactiveFormsModule],
templateUrl: './persona-form.component.html'
})
export class PersonaFormComponent {
private fb = inject(FormBuilder);
private _store = inject(PersonaStore);
get store() {
return this._store;
}
form = this.fb.group({
id: [0],
nombre: ['', Validators.required]
});
constructor() {
effect(() => {
const persona = this.store.selected();
if (persona) {
this.form.patchValue(persona);
}
});
}
guardar() {
if (this.form.invalid) return;
const persona = this.form.value;
if (persona.id) {
this.store.update(persona as any);
} else {
this.store.add(persona as any);
}
this.form.reset();
}
cancelar() {
this.store.clearSelection();
this.form.reset();
}
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioStore } from '../services/usuario.store';

@Component({
    selector: 'app-usuario-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './usuario-list.component.html'
})
export class UsuarioListComponent {
    store = inject(UsuarioStore);
    ngOnInit() {
        this.store.load();
    }
    editar(usuario: any) {
        this.store.select(usuario);
    }
    eliminar(id: number) {
        if (confirm('¿Eliminar usuario?')) {
            this.store.delete(id);
        }
    }
}
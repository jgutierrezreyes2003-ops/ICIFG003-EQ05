import { Injectable, signal, inject } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.models';
@Injectable({
    providedIn: 'root'
})
export class UsuarioStore {
    private service = inject(UsuarioService);
    usuarios = signal<Usuario[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);
    selected = signal<Usuario | null>(null);
    load() {
        this.loading.set(true);
        this.service.getAll().subscribe({
            next: data => {
                this.usuarios.set(data);
                this.loading.set(false);
            },
            error: err => {
                this.error.set('Error cargando usuarios');
                this.loading.set(false);
            }
        });
    }
    select(usuario: Usuario) {
        this.selected.set(usuario);
    }
    clearSelection() {
        this.selected.set(null);
    }
    add(usuario: Usuario) {
        this.service.create(usuario).subscribe({
            next: p => this.usuarios.update(list => [...list, p])
        });
    }
    update(usuario: Usuario) {
        this.service.update(usuario).subscribe(updated => {
            this.usuarios.update(list =>
                list.map(p => p.id === updated.id ? updated : p)
            );
            this.clearSelection();
        });
    }
    delete(id: number) {
        this.service.delete(id).subscribe({
            next: () => {
                this.usuarios.update(list =>
                    list.filter(p => p.id !== id)
                );
            }
        });
    }
}
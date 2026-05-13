import { Injectable, signal } from '@angular/core';
import { Usuario } from '../models/usuario.models';
import { UsuarioService } from './usuario.service';

@Injectable()
export class UsuarioStore {

  usuarios = signal<Usuario[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  selected = signal<Usuario | null>(null);

  private successTimer: any;
  private errorTimer: any;

  constructor(private service: UsuarioService) {
    this.load();
  }

  private mostrarSuccess(mensaje: string) {
    this.success.set(mensaje);
    clearTimeout(this.successTimer);
    this.successTimer = setTimeout(() => this.success.set(null), 3000);
  }

  private mostrarError(mensaje: string) {
    this.error.set(mensaje);
    clearTimeout(this.errorTimer);
    this.errorTimer = setTimeout(() => this.error.set(null), 3000);
  }

  load() {
    this.loading.set(true);

    this.service.getAll().subscribe({
      next: data => {
        this.usuarios.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.mostrarError('Error cargando usuarios');
        this.loading.set(false);
      }
    });
  }

  add(usuario: Usuario) {
    this.service.create(usuario).subscribe({
      next: nuevoUsuario => {
        this.usuarios.update(list => [...list, nuevoUsuario]);
        this.mostrarSuccess('Usuario guardado correctamente');
      },
      error: () => {
        this.mostrarError('Error guardando usuario');
      }
    });
  }

  update(usuario: Usuario) {
    this.service.update(usuario).subscribe({
      next: usuarioActualizado => {
        this.usuarios.update(list =>
          list.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u)
        );

        this.clearSelection();
        this.mostrarSuccess('Usuario actualizado correctamente');
      },
      error: () => {
        this.mostrarError('Error actualizando usuario');
      }
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.usuarios.update(list =>
          list.filter(u => u.id !== id)
        );

        this.mostrarSuccess('Usuario eliminado correctamente');
      },
      error: () => {
        this.mostrarError('Error eliminando usuario');
      }
    });
  }

  select(usuario: Usuario) {
    this.selected.set(usuario);
  }

  clearSelection() {
    this.selected.set(null);
  }
}
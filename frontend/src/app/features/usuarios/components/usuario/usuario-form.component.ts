import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {

  usuario = '';
  contrasena = '';

  mensajeError: string | null = null;
  mensajeSuccess: string | null = null;

  private router = inject(Router);

  private errorTimer: any;
  private successTimer: any;

  private mostrarError(mensaje: string) {
    this.mensajeError = mensaje;
    clearTimeout(this.errorTimer);
    this.errorTimer = setTimeout(() => this.mensajeError = null, 3000);
  }

  private mostrarSuccess(mensaje: string) {
    this.mensajeSuccess = mensaje;
    clearTimeout(this.successTimer);
    this.successTimer = setTimeout(() => this.mensajeSuccess = null, 3000);
  }

  login() {
    if (!this.usuario || !this.contrasena) {
      this.mostrarError('Debe ingresar usuario y contraseña');
      return;
    }

    if (this.usuario === 'admin' && this.contrasena === '1234') {
      this.mostrarSuccess('Inicio de sesión correcto');

      setTimeout(() => {
        this.router.navigate(['/inicio']);
      }, 700);

    } else {
      this.mostrarError('Credenciales incorrectas');
    }
  }
}
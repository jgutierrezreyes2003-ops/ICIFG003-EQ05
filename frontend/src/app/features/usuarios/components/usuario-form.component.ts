import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);

  form = this.fb.group({
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required]
  });

  guardar() {
    if (this.form.invalid) return;
    
    const credenciales = this.form.value;
    
    this.usuarioService.login(credenciales as any).subscribe({
      next: (respuesta) => {
        console.log("¡Login Exitoso!", respuesta);
        alert("¡Bienvenido al sistema!");
      },
      error: (err) => {
        console.error("Error en el login", err);
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
}
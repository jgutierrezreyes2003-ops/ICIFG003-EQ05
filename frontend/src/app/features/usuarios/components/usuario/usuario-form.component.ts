import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UsuarioService } from '../../services/usuario.service';

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
  private router = inject(Router);

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
        
        this.router.navigate(['/inicio']); 
      },
      error: (err) => {
        console.error("Error en el login", err);
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
}
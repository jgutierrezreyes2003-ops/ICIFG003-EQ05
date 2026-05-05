import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {
  usuario = '';
  contrasena = '';
  
  private router = inject(Router);

  login() {
    if (this.usuario === 'admin' && this.contrasena === '1234') {
      this.router.navigate(['/inicio']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
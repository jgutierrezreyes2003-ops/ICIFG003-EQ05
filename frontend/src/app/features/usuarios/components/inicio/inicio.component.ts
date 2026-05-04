import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  template: `
    <div class="landing-wrapper">
      <div class="landing-content">
        <h1>¡Bienvenido al Sistema!</h1>
        <p>Has iniciado sesión exitosamente.</p>
        <button class="btn-logout" (click)="salir()">Cerrar Sesión</button>
      </div>
    </div>
  `,
  styles: [`
    .landing-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #0f0f0f;
      color: #ffffff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: -8px;
    }
    .landing-content {
      text-align: center;
      background-color: #1a1a1a;
      padding: 50px;
      border-radius: 8px;
      border-top: 4px solid #d32f2f;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
    }
    h1 { margin-top: 0; color: #ffffff; }
    p { color: #888888; margin-bottom: 30px; }
    .btn-logout {
      background-color: #333333;
      color: #ffffff;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.3s;
    }
    .btn-logout:hover {
      background-color: #d32f2f;
    }
  `]
})
export class InicioComponent {
  constructor(private router: Router) {}

  salir() {
    // Te devuelve al login
    this.router.navigate(['/']); 
  }
}
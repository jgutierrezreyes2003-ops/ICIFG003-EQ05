import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private router: Router) {}

  irAlumnos() {
    this.router.navigate(['/alumnos']);
  }
  irProtocoloDEC() {
    this.router.navigate(['/protocolo-dec']);
  }
  salir() {
    this.router.navigate(['/']); 
  }
}
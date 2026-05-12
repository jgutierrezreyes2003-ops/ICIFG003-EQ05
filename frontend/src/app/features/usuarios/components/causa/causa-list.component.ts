import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CausaStore } from '../../services/causa.store';
import { Causa } from '../../models/causa.models';

@Component({
  selector: 'app-causa-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './causa-list.component.html',
  styleUrls: ['./causa-list.component.css']
})
export class CausaListComponent {
  store = inject(CausaStore);

  ngOnInit() {
    this.store.load();
  }

  editar(causa: Causa) {
    this.store.select(causa);
  }

  eliminar(id?: number) {
    if (!id) return;

    if (confirm('¿Eliminar causa?')) {
      this.store.delete(id);
    }
  }
}
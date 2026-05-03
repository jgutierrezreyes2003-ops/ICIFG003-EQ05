import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.models';
import { environment } from '../../../../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}`;

    getAll(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.apiUrl);
    }
    
    create(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
    }
    
    update(usuario: Usuario): Observable<Usuario> {
        return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
    }
    
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    login(credenciales: Usuario): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credenciales);
    }
}
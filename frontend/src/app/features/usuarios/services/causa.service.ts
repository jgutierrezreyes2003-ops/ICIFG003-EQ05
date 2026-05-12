import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Causa } from '../models/causa.models';

@Injectable({
  providedIn: 'root'
})
export class CausaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/entities/causa';

  getAll(): Observable<Causa[]> {
    return this.http.get<Causa[]>(this.apiUrl);
  }

  create(causa: Causa): Observable<Causa> {
    return this.http.post<Causa>(this.apiUrl, causa);
  }
  update(id: number, causa: Causa): Observable<Causa> {
    return this.http.put<Causa>(`${this.apiUrl}/${id}`, causa);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Causa } from '../models/causa.models';

@Injectable({
  providedIn: 'root'
})
export class CausaService {

  private apiUrl = 'http://localhost:8080/api/v1/entities/causa';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Causa[]> {
    return this.http.get<Causa[]>(this.apiUrl);
  }

  getById(id: number): Observable<Causa> {
    return this.http.get<Causa>(`${this.apiUrl}/${id}`);
  }

  create(causa: Causa): Observable<Causa> {
    return this.http.post<Causa>(this.apiUrl, causa);
  }

  update(causa: Causa): Observable<Causa> {
    return this.http.put<Causa>(`${this.apiUrl}/${causa.id}`, causa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
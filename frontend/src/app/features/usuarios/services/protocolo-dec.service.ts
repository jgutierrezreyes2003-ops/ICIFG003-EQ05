import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProtocoloDEC } from '../models/protocolo-dec.models';

@Injectable({
  providedIn: 'root'
})
export class ProtocoloDecService {

  private apiUrl = 'http://localhost:8080/api/v1/entities/protocolo-dec';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProtocoloDEC[]> {
    return this.http.get<ProtocoloDEC[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProtocoloDEC> {
    return this.http.get<ProtocoloDEC>(`${this.apiUrl}/${id}`);
  }

  create(protocolo: ProtocoloDEC): Observable<ProtocoloDEC> {
    return this.http.post<ProtocoloDEC>(this.apiUrl, protocolo);
  }

  update(protocolo: ProtocoloDEC): Observable<ProtocoloDEC> {
    return this.http.put<ProtocoloDEC>(`${this.apiUrl}/${protocolo.id}`, protocolo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno, Causa, ProtocoloDEC } from '../models/protocolo-dec.models';

@Injectable({
  providedIn: 'root'
})
export class ProtocoloDECService {
  private protocoloUrl = 'http://localhost:8080/api/v1/entities/protocolo-dec';
  private alumnoUrl = 'http://localhost:8080/api/v1/entities/alumno';
  private causaUrl = 'http://localhost:8080/api/v1/entities/causa';

  constructor(private http: HttpClient) {}

  listarProtocolos(): Observable<ProtocoloDEC[]> {
    return this.http.get<ProtocoloDEC[]>(this.protocoloUrl);
  }

  buscarProtocoloPorId(id: number): Observable<ProtocoloDEC> {
    return this.http.get<ProtocoloDEC>(`${this.protocoloUrl}/${id}`);
  }

  crearProtocolo(protocolo: ProtocoloDEC): Observable<ProtocoloDEC> {
    return this.http.post<ProtocoloDEC>(this.protocoloUrl, protocolo);
  }

  actualizarProtocolo(id: number, protocolo: ProtocoloDEC): Observable<ProtocoloDEC> {
    return this.http.put<ProtocoloDEC>(`${this.protocoloUrl}/${id}`, protocolo);
  }

  eliminarProtocolo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.protocoloUrl}/${id}`);
  }

  listarAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.alumnoUrl);
  }

  listarCausas(): Observable<Causa[]> {
    return this.http.get<Causa[]>(this.causaUrl);
  }
}

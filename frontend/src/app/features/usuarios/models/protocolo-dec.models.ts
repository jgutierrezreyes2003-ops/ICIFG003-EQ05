import { Alumno } from './alumno.models';
import { Causa } from './causa.models';

export interface ProtocoloDEC {
  id?: number;
  fecha: string;
  descripcion: string;
  causa: Causa;
  alumnos: Alumno[];
}

export interface ProtocoloDECForm {
  id?: number;
  fecha: string;
  descripcion: string;
  causaId: number | null;
  alumnoIds: number[];
}
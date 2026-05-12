export interface Alumno {
  id: number;
  nombre: string;
  curso: string;
}

export interface Causa {
  id: number;
  nombreCausa: string;
}

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

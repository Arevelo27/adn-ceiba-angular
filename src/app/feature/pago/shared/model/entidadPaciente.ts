import { Entidad } from "./entidad";
import { Paciente } from "./paciente";

export class EntidadPaciente {
  idEntidadPaciente: number;
  paciente: Paciente;
  idEntidad: number;
  entidad: Entidad;
  valor: number;
  fechaVinculacion: string;
  fechaPago: string;
  activo: number;

  constructor(
    idEntidadPaciente: number,
    paciente: Paciente,
    valor: number,
    fechaVinculacion: string,
    fechaPago: string,
    activo: number
  ) {
    this.idEntidadPaciente = idEntidadPaciente;
    this.paciente = paciente;
    this.valor = valor;
    this.fechaVinculacion = fechaVinculacion;
    this.fechaPago = fechaPago;
    this.activo = activo;
  }
}

import { Paciente } from "./paciente";

export class EntidadPaciente {
    idEntidadPaciente: number;
    paciente: Paciente;
    entidad: number;
    valor: number;
    fechaVinculacion: string;
    fechaPago: string;
    activo: string;

    constructor(idEntidadPaciente: number, paciente: Paciente, entidad: number, valor: number, fechaVinculacion: string, fechaPago: string, activo: string) {
        this.idEntidadPaciente = idEntidadPaciente;
        this.paciente = paciente;
        this.entidad = entidad;
        this.valor = valor;
        this.fechaVinculacion = fechaVinculacion;
        this.fechaPago = fechaPago;
        this.activo = activo;
    }
}


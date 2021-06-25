import { Paciente } from "./paciente";

export class EntidadPacienteTemp {
    idEntidadPaciente: number;
    paciente: Paciente;
    entidad: number;
    valor: number;
    fechaVinculacion: string;
    fechaPago: string;
    activo: number;

    constructor(idEntidadPaciente: number, paciente: Paciente, valor: number, fechaVinculacion: string, fechaPago: string, activo: number) {
        this.idEntidadPaciente = idEntidadPaciente;
        this.paciente = paciente;
        this.valor = valor;
        this.fechaVinculacion = fechaVinculacion;
        this.fechaPago = fechaPago;
        this.activo = activo;
    }
}


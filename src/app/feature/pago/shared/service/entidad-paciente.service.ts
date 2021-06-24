import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { EntidadPaciente } from "../model/entidadPaciente";

@Injectable({
  providedIn: "root",
})
export class EntidadPacienteService {
  private URL: string;

  constructor(protected http: HttpService) {
    this.URL = `${environment.endpoint}/entidad_paciente`;
  }

  public consultar() {
    return this.http.doGet<EntidadPaciente[]>(
      this.URL,
      this.http.optsName("consultar entidad paciente")
    );
  }

  public consultarIdentificacion(identificacion: number) {
    return this.http.doGet<EntidadPaciente[]>(
      `${this.URL}/${identificacion}`,
      this.http.optsName("consultar entidad paciente por identificacion")
    );
  }

  public actualizar(entidadPaciente: EntidadPaciente, identificacion: number) {
    return this.http.doPut<EntidadPaciente, boolean>(
      `${this.URL}/${identificacion}`,
      entidadPaciente,
      this.http.optsName("actualizar entidad_paciente")
    );
  }
}

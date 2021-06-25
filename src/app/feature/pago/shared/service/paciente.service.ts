import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { Paciente } from "../model/paciente";

@Injectable({
  providedIn: "root",
})
export class PacienteService {
  private URL: string;

  constructor(protected http: HttpService) {
    this.URL = `${environment.endpoint}/paciente`;
  }

  public consultar() {
    return this.http.doGet<Paciente[]>(
      this.URL,
      this.http.optsName("consultar paciente")
    );
  }

  public consultarIdentificacion(identificacion: number) {
    return this.http.doGet<Paciente[]>(
      `${this.URL}/${identificacion}`,
      this.http.optsName("consultar paciente por identificacion")
    );
  }

  public actualizar(paciente: Paciente, identificacion: number) {
    return this.http.doPut<Paciente, boolean>(
      `${this.URL}/${identificacion}`,
      paciente,
      this.http.optsName("actualizar _paciente")
    );
  }

  public guardar(paciente: Paciente) {
    return this.http.doPost<Paciente, boolean>(
      this.URL,
      paciente,
      this.http.optsName("crear paciente")
    );
  }

  public eliminar(paciente: Paciente) {
    return this.http.doDelete<boolean>(
      `${this.URL}/${paciente.identificacion}`,
      this.http.optsName("eliminar productos")
    );
  }
}

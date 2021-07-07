import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { Paciente } from "../model/paciente";

@Injectable({
  providedIn: "root",
})
export class PacienteConsultasService {
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
    return this.http.doGet<Paciente>(
      `${this.URL}/${identificacion}`,
      this.http.optsName("consultar paciente por identificacion")
    );
  }
}

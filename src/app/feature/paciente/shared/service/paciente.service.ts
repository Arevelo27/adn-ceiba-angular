import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Paciente } from "@shared/copmponents/notificacion/model/paciente";

@Injectable()
export class PacienteService {
  private URL: string;

  constructor(protected http: HttpService) {
    this.URL = `${environment.endpoint}/paciente`;
  }

  public actualizar(paciente: Paciente, identificacion: number) {
    return this.http
      .doPut<Paciente, boolean>(
        `${this.URL}/${identificacion}`,
        paciente,
        this.http.optsName("actualizar paciente")
      );
  }

  public guardar(paciente: Paciente) {
    return this.http
      .doPost<Paciente, boolean>(
        this.URL,
        paciente,
        this.http.optsName("crear paciente")
      )
  }

  public eliminar(paciente: Paciente) {
    return this.http
      .doDelete<boolean>(
        `${this.URL}/${paciente.idPaciente}`,
        this.http.optsName("eliminar paciente")
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          console.log(`error al eliminar el paciente, ${err.error.mensaje}`);
          return throwError(() => new Error(`test ${err}`));
        })
      );
  }
}

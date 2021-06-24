import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import {  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pago } from '../model/pago';

@Injectable()
export class PagoService {
  private URL: string;
  private URL_CONSULTA_PAGOS: string;

  constructor(protected http: HttpService) {
    this.URL = `${environment.endpoint}/pagos`;;
    this.URL_CONSULTA_PAGOS = '/id?identificacion=';
  }

  public consultar() {
    return this.http.doGet<Pago[]>(this.URL, this.http.optsName('consultar pagos'));
  }

  public consultarIdentificacion(identificacion: string) {
    return this.http.doGet<Pago[]>(`${this.URL}${this.URL_CONSULTA_PAGOS}${identificacion}`,
           this.http.optsName('consultar pagos por identificacion'));
  }

  public actualizar(pago: Pago) {
    return this.http.doPut<Pago, boolean>(this.URL, pago, this.http.optsName('actualizar pagos'));
  }
}

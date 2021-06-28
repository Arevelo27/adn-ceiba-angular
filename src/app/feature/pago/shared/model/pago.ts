export class Pago {
  idPago: string;
  documentoIdentificacionDeudor: string;
  codigoFactura: string;
  tipoExamen: string;
  valorAdeudado: string;
  valorPagado: string;
  fechaVencimientoPago: string;
  fechaPago: string;

  constructor(
    idPago: string,
    documentoIdentificacionDeudor: string,
    codigoFactura: string,
    tipoExamen: string,
    valorAdeudado: string,
    valorPagado: string,
    fechaVencimientoPago: string,
    fechaPago?: string
  ) {
    this.idPago = idPago;
    this.documentoIdentificacionDeudor = documentoIdentificacionDeudor;
    this.codigoFactura = codigoFactura;
    this.tipoExamen = tipoExamen;
    this.valorAdeudado = valorAdeudado;
    this.valorPagado = valorPagado;
    this.fechaVencimientoPago = fechaVencimientoPago;
    this.fechaPago = fechaPago;
  }
}

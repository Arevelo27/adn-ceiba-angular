import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Notificacion } from "@shared/copmponents/notificacion/model/notificacion";
import { NotificacionService } from "@shared/copmponents/notificacion/service/notificacion.service";
import { Paciente } from "@shared/copmponents/notificacion/model/paciente";
import { PacienteService } from "@paciente/shared/service/paciente.service";
import { PacienteConsultasService } from "@shared/copmponents/notificacion/service/paciente-consultas.service";
import { PagoService } from "../../shared/service/pago.service";
import { EntidadPacienteService } from "../../shared/service/entidad-paciente.service";
import { Pago } from "../../shared/model/pago";
import { EntidadPaciente } from "@pago/shared/model/entidadPaciente";
import Stepper from "bs-stepper";

@Component({
  selector: "app-listar-pago",
  templateUrl: "./listar-pago.component.html",
})
export class ListarPagoComponent implements OnInit {
  private stepper: Stepper;
  public isLinear = true;
  public isActivo = true;
  public pagoForm: FormGroup;
  public pagoItem: Pago;
  public pacienteItem: Paciente;
  public entidadPacienteItem: EntidadPaciente;
  public listaLocalPagos: Pago[];
  public listaLocalPaciente: Paciente[];
  public listaLocalEntidadPaciente: EntidadPaciente[];
  public verPagosPendientes = false;
  public verPaciente = false;
  public verValidarPagos = false;
  public verEntidadPacientePendientes = false;
  public tituloExito = "¡Éxito!";
  public pagoExitoso = "¡Pago realizado con Exito!";
  public tituloAdvertencia = "¡Advertencia!";
  public pagoNoEncontrado = "¡No Existen Pagos asociados!";
  public pacienteNoEncontrado = "¡No Existe el paciente!";
  public entidadPacienteNoEncontrado =
    "¡El paciente, no tiene una entidad asignada!";
  public entidadPacienteNoActivo =
    "¡Paciente inactivo en la entidad, no refleja el pago!";
  public notificacion: Notificacion;
  public tituloError = "¡Error!";
  public descripcionError =
    "¡Ocurrio un error de conexión al realizar la consulta!";

  constructor(
    protected pagoService: PagoService,
    protected pacienteService: PacienteService,
    protected pacienteConsultasService: PacienteConsultasService,
    protected entidadPacienteService: EntidadPacienteService,
    private notificacionService: NotificacionService
  ) {}

  next() {
    if (true) {
      this.isLinear = false;
      this.stepper.next();
    }
  }

  previous() {
    this.stepper.previous();
    this.isLinear = true;
    this.limpiarFormulario();
  }

  onSubmit() {
    return false;
  }

  ngOnInit() {
    this.construirFormulario();
  }

  construirFormulario(): void {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: true,
      animation: true,
    });
    this.pagoForm = new FormGroup({
      identificacion: new FormControl("", [Validators.required]),
    });
  }

  consultarPacientePorCedula() {
    this.pacienteConsultasService
      .consultarIdentificacion(this.pagoForm.get("identificacion").value)
      .subscribe({
        next: (respuesta) => {
          if (respuesta != null) {
            this.verPaciente = true;
            this.pacienteItem = respuesta;
            this.consultarEntidadPacientePorCedula(this.pacienteItem);
          } else {
            this.emiteMensaje(
              this.tituloAdvertencia,
              this.pacienteNoEncontrado
            );
            this.limpiarFormularioEntidadPaciente();
          }
        },
        error: (err) => {
          this.emiteMensaje(this.tituloError, this.descripcionError);
          console.log(err);
          this.limpiarFormularioEntidadPaciente();
        },
      });
  }

  consultarEntidadPacientePorCedula(paciente: Paciente) {
    this.entidadPacienteService
      .consultarIdentificacion(paciente.identificacion)
      .subscribe({
        next: (respuesta) => {
          this.listaLocalEntidadPaciente = respuesta;
        },
        error: (err) => {
          this.emiteMensaje(this.tituloError, this.descripcionError);
          console.log(err);
          this.limpiarFormularioEntidadPaciente();
        },
        complete: () => {
          if (this.listaLocalEntidadPaciente.length > 0) {
            this.verEntidadPacientePendientes = true;
            this.entidadPacienteItem = this.listaLocalEntidadPaciente[0];

            if (this.entidadPacienteItem.activo === 0) {
              this.emiteMensaje(
                this.tituloAdvertencia,
                this.entidadPacienteNoActivo
              );
            } else {
              this.consultarPorCedula();
            }
          } else {
            this.emiteMensaje(
              this.tituloAdvertencia,
              this.entidadPacienteNoEncontrado
            );
            this.limpiarFormularioEntidadPaciente();
          }
        },
      });
  }

  pagarEntidadPaciente(entidadPaciente: EntidadPaciente) {
    entidadPaciente.valor = 80000.0;
    entidadPaciente.activo = 1;
    entidadPaciente.fechaPago = this.obtenerFechaActual(0);
    this.entidadPacienteService
      .actualizar(entidadPaciente, entidadPaciente.paciente.identificacion)
      .subscribe({
        next: (v) => console.log(v),
        error: (err) => {
          this.emiteMensaje(this.tituloError, this.descripcionError);
          console.log(err);
        },
        complete: () => {
          this.emiteMensaje(this.tituloExito, this.pagoExitoso);
          this.verValidarPagos = true;
          this.consultarEntidadPacientePorCedula(entidadPaciente.paciente);
        },
      });
  }

  limpiarFormularioEntidadPaciente() {
    this.verEntidadPacientePendientes = false;
    this.pagoForm.get("identificacion").setValue("");
    this.entidadPacienteItem = null;
    this.listaLocalEntidadPaciente = null;
    this.isLinear = true;
  }

  consultarPorCedula() {
    this.pagoService
      .consultarIdentificacion(this.pagoForm.get("identificacion").value)
      .subscribe({
        next: (respuesta) => {
          this.listaLocalPagos = respuesta;
          if (this.listaLocalPagos.length > 0) {
            this.verPagosPendientes = true;
          } else {
            this.emiteMensaje(this.tituloAdvertencia, this.pagoNoEncontrado);
            this.limpiarFormulario();
          }
        },
        error: (err) => {
          this.emiteMensaje(this.tituloError, this.descripcionError);
          console.log(err);
          this.limpiarFormulario();
        },
      });
  }

  pagar(pago: Pago) {
    this.pagoItem = pago;
    pago.fechaPago = this.obtenerFechaActual(1);
    pago.valorPagado = this.pagoItem.valorAdeudado;
    pago.valorAdeudado = this.pagoItem.valorPagado;

    this.pagoService.actualizar(pago).subscribe({
      error: (err) => {
        this.emiteMensaje(this.tituloError, this.descripcionError);
        console.log(err);
      },
      complete: () => {
        this.emiteMensaje(this.tituloExito, this.pagoExitoso);
        this.verValidarPagos = true;
        this.consultarPorCedula();
      },
    });
  }

  limpiarFormulario() {
    this.verPagosPendientes = false;
    this.pagoForm.get("identificacion").setValue("");
  }

  obtenerFechaActual(dia?: number) {
    const date = new Date();
    const day = "" + date.getDate();
    const month = "" + (date.getMonth() + dia);
    const year = "" + date.getFullYear();

    // " 05:00:00"
    if (dia !== 1) {
      const hours = "" + date.getHours();
      const minutes = "" + date.getMinutes();
      const seconds = "" + date.getSeconds();

      return `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )} ${hours.padStart(2, "0")}:${minutes.padStart(
        2,
        "0"
      )}:${seconds.padStart(2, "0")}`;
    } else {
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }

  emiteMensaje(titulo: string, descripcion: string) {
    this.notificacion = new Notificacion(titulo, descripcion, true);
    this.notificacionService.emiteAdvertencia(this.notificacion);
  }
}

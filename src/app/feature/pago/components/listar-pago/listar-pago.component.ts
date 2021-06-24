import { Component, OnInit } from "@angular/core";
import { PagoService } from "../../shared/service/pago.service";
import { EntidadPacienteService } from "../../shared/service/entidad-paciente.service";
import { Pago } from "../../shared/model/pago";
import { EntidadPaciente } from "@pago/shared/model/entidadPaciente";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Notificacion } from "@shared/copmponents/notificacion/model/notificacion";
import { NotificacionService } from "@shared/copmponents/notificacion/service/notificacion.service";
import Stepper from "bs-stepper";

@Component({
  selector: "app-listar-pago",
  templateUrl: "./listar-pago.component.html",
})
export class ListarPagoComponent implements OnInit {
  private stepper: Stepper;
  public isLinear: boolean = true;
  public isActivo: boolean = true;
  public pagoForm: FormGroup;
  public listaLocalPagos: Pago[];
  public listaLocalEntidadPaciente: EntidadPaciente[];
  public verPagosPendientes = false;
  public verValidarPagos = false;
  public verEntidadPacientePendientes = false;
  public tituloExito = "¡Éxito!";
  public pagoExitoso = "¡Pago realizado con Exito!";
  public tituloAdvertencia = "¡Advertencia!";
  public pagoNoEncontrado = "¡No Existen Pagos asociados!";
  public entidadPacienteNoEncontrado = "¡No Existe el paciente!";
  public entidadPacienteNoActivo = "¡Paciente inactivo en la entidad, no refleja el pago!";
  public notificacion: Notificacion;
  public tituloError = "¡Error!";
  public descripcionError =
    "¡Ocurrio un error de conexión al realizar la consulta!";
  public pagoItem: Pago;
  public entidadPacienteItem: EntidadPaciente;

  constructor(
    protected pagoService: PagoService,
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

  consultarEntidadPacientePorCedula() {
    this.entidadPacienteService
      .consultarIdentificacion(this.pagoForm.get("identificacion").value)
      .subscribe(
        (respuesta) => {
          this.listaLocalEntidadPaciente = respuesta;
          if (this.listaLocalEntidadPaciente.length > 0) {
            this.verEntidadPacientePendientes = true;
            this.entidadPacienteItem = this.listaLocalEntidadPaciente[0];
            
            if (this.entidadPacienteItem.activo == "NO") {
              this.emiteMensaje(this.tituloAdvertencia, this.entidadPacienteNoActivo);
            } else {
              this.consultarPorCedula();
            }
            
          } else {
            this.emiteMensaje(this.tituloAdvertencia, this.entidadPacienteNoEncontrado)
            this.limpiarFormularioEntidadPaciente();
          }
        },
        (err) => {
          this.emiteMensaje(this.tituloError, this.descripcionError)
          console.log(err);
          this.limpiarFormularioEntidadPaciente();
        }
      );
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
      .subscribe(
        (respuesta) => {
          this.listaLocalPagos = respuesta;
          if (this.listaLocalPagos.length > 0) {
            this.verPagosPendientes = true;
            
            // for (let i = 0; i < this.listaLocalPagos.length; i++) {
            //   this.pagoItem = this.listaLocalPagos[i];
            //   if (this.pagoItem.valorPagado == '0.00') {
            //     this.verValidarPagos = true;
            //     // break;
            //   }
            // }
            
          } else {
            this.emiteMensaje(this.tituloAdvertencia, this.pagoNoEncontrado)
            this.limpiarFormulario();
          }
        },
        (err) => {
          this.emiteMensaje(this.tituloError, this.descripcionError)
          console.log(err);
          this.limpiarFormulario();
        }
      );
  }

  pagar(pago: Pago) {
    this.pagoItem = pago;
    pago.fechaPago = this.obtenerFechaActual();
    pago.valorPagado = this.pagoItem.valorAdeudado;
    pago.valorAdeudado = this.pagoItem.valorPagado;

    this.pagoService.actualizar(pago).subscribe(
      () => {
        this.emiteMensaje(this.tituloExito, this.pagoExitoso)
        this.verValidarPagos = true;
        this.consultarPorCedula();
      },
      (err) => {
        this.emiteMensaje(this.tituloError, this.descripcionError)
        console.log(err);
      }
    );
  }

  limpiarFormulario() {
    this.verPagosPendientes = false;
    this.pagoForm.get("identificacion").setValue("");
  }

  obtenerFechaActual() {
    const date = new Date();
    const day = "" + date.getDate();
    const month = "" + (date.getMonth() + 1);
    const year = "" + date.getFullYear();
    let fechaActual = "";

    fechaActual = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    return fechaActual;
  }
  
  emiteMensaje(titulo: string, descripcion: string){
    this.notificacion = new Notificacion(
      titulo,
      descripcion,
      true
    );
    this.notificacionService.emiteAdvertencia(this.notificacion);
  }

}

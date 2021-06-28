import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Paciente } from "@pago/shared/model/paciente";
import { PacienteService } from "@pago/shared/service/paciente.service";
import { Notificacion } from "@shared/copmponents/notificacion/model/notificacion";
import { NotificacionService } from "@shared/copmponents/notificacion/service/notificacion.service";

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;
const VALIDATORS_PATTERN_REGEX = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

@Component({
  selector: "app-crear-paciente",
  templateUrl: "./crear-paciente.component.html",
  styleUrls: ["./crear-paciente.component.css"],
})
export class CrearPacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  tituloExito = "¡Éxito!";
  pagoExitoso = "Paciente grabado con Exito!";
  tituloAdvertencia = "¡Advertencia!";
  pacienteExiste = "Ya Existe el paciente, con ese número de identicación!";
  notificacion: Notificacion;
  tituloError = "¡Error!";
  descripcionError = "¡Ocurrio un error al realizar la transación!";
  public messageError = "";

  constructor(
    protected pacienteServices: PacienteService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit() {
    this.construirFormularioPaciente();
  }

  crear() {
    let paciente = new Paciente();
    paciente.nombres = this.pacienteForm.value["nombres"];
    paciente.apellidos = this.pacienteForm.value["apellidos"];
    paciente.identificacion = this.pacienteForm.value["identificacion"];
    paciente.direccion = this.pacienteForm.value["direccion"];
    paciente.telefono = this.pacienteForm.value["telefono"];
    paciente.email = this.pacienteForm.value["correo"];

    this.pacienteServices.guardar(paciente).subscribe(
      () => {
        this.emiteMensaje(this.tituloExito, this.pagoExitoso);
        setTimeout(() => {
          this.limpiarControles();
        }, 2000);
      },
      (err) => {
        this.messageError = err.error.mensaje;
        this.emiteMensaje(this.tituloError, this.messageError);
        console.log(err);
      }
    );
  }

  consultarPorCedula(identificacion: number) {
    let isPresent: boolean = false;
    this.pacienteServices
      .consultarIdentificacion(identificacion)
      .subscribe((respuesta) => {
        if (respuesta.identificacion == identificacion) {
          this.emiteMensaje(this.tituloAdvertencia, this.pacienteExiste);
          isPresent = true;
        }
      });
    return isPresent;
  }

  private construirFormularioPaciente() {
    this.pacienteForm = new FormGroup({
      nombres: new FormControl("", [
        Validators.required,
        Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO),
      ]),
      apellidos: new FormControl("", [Validators.required]),
      identificacion: new FormControl("", [Validators.required]),
      direccion: new FormControl("", [Validators.required]),
      telefono: new FormControl("", [Validators.required]),
      correo: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(VALIDATORS_PATTERN_REGEX),
      ]),
    });
  }

  limpiarControles() {
    this.pacienteForm.reset();
  }

  emiteMensaje(titulo: string, descripcion: string) {
    this.notificacion = new Notificacion(titulo, descripcion, true);
    this.notificacionService.emiteAdvertencia(this.notificacion);
  }
}

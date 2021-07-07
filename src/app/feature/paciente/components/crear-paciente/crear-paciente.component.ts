import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Paciente } from "@shared/copmponents/notificacion/model/paciente";
import { PacienteService } from "@paciente/shared/service/paciente.service";
import { PacienteConsultasService } from "@shared/copmponents/notificacion/service/paciente-consultas.service";
import { Notificacion } from "@shared/copmponents/notificacion/model/notificacion";
import { NotificacionService } from "@shared/copmponents/notificacion/service/notificacion.service";

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;
const VALIDATORS_PATTERN_REGEX = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
const VALUE_NOMBRES = "nombres";
const VALUE_APELLIDOS = "apellidos";
const VALUE_IDENTIFICACION = "identificacion";
const VALUE_DIRECCION = "direccion";
const VALUE_TELEFONO = "telefono";
const VALUE_EMAIL = "correo";

@Component({
  selector: "app-crear-paciente",
  templateUrl: "./crear-paciente.component.html",
  styleUrls: ["./crear-paciente.component.css"],
})
export class CrearPacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  tituloExito = "¡Éxito!";
  pacienteExitoso = "Paciente grabado con Exito!";
  tituloAdvertencia = "¡Advertencia!";
  pacienteExiste = "Ya Existe el paciente, con ese número de identicación!";
  notificacion: Notificacion;
  tituloError = "¡Error!";
  descripcionError = "¡Ocurrio un error al realizar la transación!";
  public messageError = "";

  constructor(
    protected pacienteServices: PacienteService,
    protected pacienteService: PacienteConsultasService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit() {
    this.construirFormularioPaciente();
  }

  crear() {
    const paciente = new Paciente();
    paciente.nombres = this.pacienteForm.value[VALUE_NOMBRES];
    paciente.apellidos = this.pacienteForm.value[VALUE_APELLIDOS];
    paciente.identificacion = this.pacienteForm.value[VALUE_IDENTIFICACION];
    paciente.direccion = this.pacienteForm.value[VALUE_DIRECCION];
    paciente.telefono = this.pacienteForm.value[VALUE_TELEFONO];
    paciente.email = this.pacienteForm.value[VALUE_EMAIL];

    this.pacienteServices.guardar(paciente).subscribe({
      next: (v) => console.log(v),
      error: (err) => {
        this.messageError = err.error.mensaje;
        this.emiteMensaje(this.tituloError, this.messageError);
        console.dir(err);
      },
      complete: () => {
        this.emiteMensaje(this.tituloExito, this.pacienteExitoso);
        setTimeout(() => {
          this.limpiarControles();
        }, 2000);
      },
    });
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

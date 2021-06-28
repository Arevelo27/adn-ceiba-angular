import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Paciente } from "@pago/shared/model/paciente";
import { PacienteService } from "@pago/shared/service/paciente.service";
import { Notificacion } from "@shared/copmponents/notificacion/model/notificacion";
import { NotificacionService } from "@shared/copmponents/notificacion/service/notificacion.service";

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;
const VALIDATORS_PATTERN_REGEX = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

@Component({
  selector: "app-editar-paciente",
  templateUrl: "./editar-paciente.component.html",
  styleUrls: ["./editar-paciente.component.css"],
})
export class EditarPacienteComponent implements OnInit {
  pacienteEditForm: FormGroup;
  notificacion: Notificacion;
  tituloError = "¡Error!";
  descripcionError = "¡Ocurrio un error al realizar la transación!";
  tituloExito = "¡Éxito!";
  paacienteExitoso = "Paciente editado con Exito!";
  public messageError = "";
  public data: Paciente;
  public modalHeader: string;
  public paciente: Paciente;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    protected pacienteServices: PacienteService,
    private notificacionService: NotificacionService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.construirFormularioPaciente();
    this.paciente = { ...this.data };
    this.initForm();
  }
  crear() {
    
    let paciente = new Paciente();
    paciente.nombres = this.pacienteEditForm.value["nombres"];
    paciente.apellidos = this.pacienteEditForm.value["apellidos"];
    paciente.identificacion = this.pacienteEditForm.value["identificacion"];
    paciente.direccion = this.pacienteEditForm.value["direccion"];
    paciente.telefono = this.pacienteEditForm.value["telefono"];
    paciente.email = this.pacienteEditForm.value["correo"];

    this.pacienteServices.actualizar(paciente, this.paciente.identificacion).subscribe(
      () => {
        this.emiteMensaje(this.tituloExito, this.paacienteExitoso);
        
        setTimeout(() => {        
          this.passEntry.emit(this.paciente);
          this.activeModal.close(this.paciente);
        }, 1500);
      },
      (err) => {
        this.messageError = err.error.mensaje;
        this.emiteMensaje(this.tituloError, this.messageError);
        console.log(err);
      }
    );
  }

  initForm() {
    this.pacienteEditForm = new FormGroup({
      id: new FormControl(this.paciente.idPaciente),
      nombres: new FormControl(this.paciente.nombres),
      apellidos: new FormControl(this.paciente.apellidos),
      identificacion: new FormControl(this.paciente.identificacion),
      direccion: new FormControl(this.paciente.direccion),
      telefono: new FormControl(this.paciente.telefono),
      correo: new FormControl(this.paciente.email),
    });
  }

  private construirFormularioPaciente() {
    this.pacienteEditForm = new FormGroup({
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

  emiteMensaje(titulo: string, descripcion: string) {
    this.notificacion = new Notificacion(titulo, descripcion, true);
    this.notificacionService.emiteAdvertencia(this.notificacion);
  }
}

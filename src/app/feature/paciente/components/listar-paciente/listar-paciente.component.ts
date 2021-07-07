import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Paciente } from "@shared/copmponents/notificacion/model/paciente";
import { PacienteService } from "@paciente/shared/service/paciente.service";
import { PacienteConsultasService } from "@shared/copmponents/notificacion/service/paciente-consultas.service";
import { NotificacionService } from "@shared/copmponents/notificacion/service/notificacion.service";
import { Notificacion } from "@shared/copmponents/notificacion/model/notificacion";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { EditarPacienteComponent } from "../editar-paciente/editar-paciente.component";

@Component({
  selector: "app-listar-paciente",
  templateUrl: "./listar-paciente.component.html",
  styleUrls: ["./listar-paciente.component.css"],
})
export class ListarPacienteComponent implements OnInit {
  public listaPacientes: Observable<Paciente[]>;
  public verPaciente = false;
  public tituloError = "¡Error!";
  public tituloExito = "¡Éxito!";
  public pagoExitoso = "¡Paciente elimido con Éxito!";
  public messageError = "";
  public notificacion: Notificacion;
  public closeResult = "";

  constructor(
    protected pacienteService: PacienteService,
    protected pacienteConsultasService: PacienteConsultasService,
    private notificacionService: NotificacionService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.listarPacientes();
  }

  listarPacientes() {
    this.listaPacientes = this.pacienteConsultasService.consultar();
  }

  abrirDialogo(paciente?: Paciente) {
    console.log(paciente);
    const activeModal = this.modalService.open(EditarPacienteComponent);

    activeModal.componentInstance.modalHeader = "Advertiser";
    activeModal.componentInstance.data = paciente;

    activeModal.result.then(
      (result) => {
        console.log(`Result modal: ${result.idPaciente}`);
        this.closeResult = `Closed with: ${result}`;
        this.listarPacientes();
      },
      (reason) => {
        console.log(`Reason modal: ${reason}`);
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  eliminarPaciente(paciente: Paciente) {
    this.pacienteService.eliminar(paciente).subscribe({
      next: (v) => console.log(v),
      error: (err) => {
        this.messageError = err.error.mensaje;
        this.emiteMensaje(this.tituloError, this.messageError);
        console.log(err);
      },
      complete: () => {
        this.emiteMensaje(this.tituloExito, this.pagoExitoso);
        this.listarPacientes();
      },
    });
  }

  emiteMensaje(titulo: string, descripcion: string) {
    this.notificacion = new Notificacion(titulo, descripcion, true);
    this.notificacionService.emiteAdvertencia(this.notificacion);
  }
}

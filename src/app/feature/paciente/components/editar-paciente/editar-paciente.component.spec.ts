import { CommonModule } from "@angular/common";
import { of } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "@core/services/http.service";
import { Notificacion } from "@shared/copmponents/notificacion/model/notificacion";

import { EditarPacienteComponent } from "./editar-paciente.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Paciente } from "@shared/copmponents/notificacion/model/paciente";
import { PacienteService } from "@paciente/shared/service/paciente.service";
import { PacienteConsultasService } from "@shared/copmponents/notificacion/service/paciente-consultas.service";

const VALUE_IDENTIFICACION = "identificacion";

describe("EditarPacienteComponent", () => {
  let component: EditarPacienteComponent;
  let fixture: ComponentFixture<EditarPacienteComponent>;
  let pacienteService: PacienteService;
  let notificacion: Notificacion;
  const NOMBRES_TEST = "Nombre test";
  const APELLIDOS_TEST = "Nombre test";
  const IDENTIFICACION_TEST = 1111144555;
  const DIRECCION_TEST = "Carrera 44a #12-29";
  const TELEFONO_TEST = "12345678";
  const EMAIL_TEST = "test@gmail.com";

  const TITULO_NOTIFICACION_EXITOSA = "¡Éxito!";
  const DESCRIPCION_NOTIFICACION_EXITOSA = "Paciente editado con Exito!";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPacienteComponent],
      imports: [CommonModule, HttpClientModule, RouterTestingModule],
      providers: [
        HttpService,
        NgbActiveModal,
        PacienteService,
        PacienteConsultasService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPacienteComponent);
    component = fixture.componentInstance;
    pacienteService = TestBed.inject(PacienteService);
    fixture.detectChanges();
  });

  it("Debería crearse el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Debería ser valido el formulario si esta diligenciado", () => {
    const paciente = new Paciente();
    paciente.nombres = NOMBRES_TEST;
    paciente.apellidos = APELLIDOS_TEST;
    paciente.identificacion = IDENTIFICACION_TEST;
    paciente.direccion = DIRECCION_TEST;
    paciente.telefono = TELEFONO_TEST;
    paciente.email = EMAIL_TEST;

    component.data = paciente;

    component.pacienteEditForm.controls.nombres.setValue(
      component.data.nombres
    );
    component.pacienteEditForm.controls.apellidos.setValue(
      component.data.apellidos
    );
    component.pacienteEditForm.controls.identificacion.setValue(
      component.data.identificacion
    );
    component.pacienteEditForm.controls.direccion.setValue(
      component.data.direccion
    );
    component.pacienteEditForm.controls.telefono.setValue(
      component.data.telefono
    );
    component.pacienteEditForm.controls.correo.setValue(component.data.email);

    expect(component.pacienteEditForm.get(VALUE_IDENTIFICACION).value).toEqual(
      component.data.identificacion
    );
  });

  it("Editando paciente", () => {
    // Arrange
    component.pacienteEditForm.controls.nombres.setValue(NOMBRES_TEST);
    component.pacienteEditForm.controls.apellidos.setValue(APELLIDOS_TEST);
    component.pacienteEditForm.controls.identificacion.setValue(
      IDENTIFICACION_TEST
    );
    component.pacienteEditForm.controls.direccion.setValue(DIRECCION_TEST);
    component.pacienteEditForm.controls.telefono.setValue(TELEFONO_TEST);
    component.pacienteEditForm.controls.correo.setValue(EMAIL_TEST);
    expect(component.pacienteEditForm.valid).toBeTruthy();

    spyOn(pacienteService, "actualizar").and.returnValue(of(true));
    notificacion = new Notificacion(
      TITULO_NOTIFICACION_EXITOSA,
      DESCRIPCION_NOTIFICACION_EXITOSA,
      true
    );

    // Act
    component.crear();

    // expect
    expect(component.notificacion).toEqual(notificacion);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});

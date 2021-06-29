import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { of } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "@core/services/http.service";
import { Notificacion } from "@shared/copmponents/notificacion/model/notificacion";
import { PacienteService } from "@shared/copmponents/notificacion/service/paciente.service";

import { CrearPacienteComponent } from "./crear-paciente.component";

describe("CrearPacienteComponent", () => {
  let component: CrearPacienteComponent;
  let fixture: ComponentFixture<CrearPacienteComponent>;
  let pacienteService: PacienteService;
  let notificacion: Notificacion;
  const NOMBRES_TEST = "Nombre test";
  const APELLIDOS_TEST = "Nombre test";
  const IDENTIFICACION_TEST = 1111144555;
  const DIRECCION_TEST = "Carrera 44a #12-29";
  const TELEFONO_TEST = "12345678";
  const EMAIL_TEST = "test@gmail.com";
  const TITULO_NOTIFICACION_EXITOSA = "¡Éxito!";
  const DESCRIPCION_NOTIFICACION_EXITOSA = "Paciente grabado con Exito!";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearPacienteComponent],
      imports: [CommonModule, HttpClientModule, RouterTestingModule],
      providers: [HttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPacienteComponent);
    component = fixture.componentInstance;
    pacienteService = TestBed.inject(PacienteService);
    fixture.detectChanges();
  });

  it("Debería crearse el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Debería ser invalido el formulario si esta vacio", () => {
    expect(component.pacienteForm.valid).toBeFalsy();
  });

  it("Registrando paciente", () => {
    // Arrange
    expect(component.pacienteForm.valid).toBeFalsy();
    component.pacienteForm.controls.nombres.setValue(NOMBRES_TEST);
    component.pacienteForm.controls.apellidos.setValue(APELLIDOS_TEST);
    component.pacienteForm.controls.identificacion.setValue(
      IDENTIFICACION_TEST
    );
    component.pacienteForm.controls.direccion.setValue(DIRECCION_TEST);
    component.pacienteForm.controls.telefono.setValue(TELEFONO_TEST);
    component.pacienteForm.controls.correo.setValue(EMAIL_TEST);
    expect(component.pacienteForm.valid).toBeTruthy();

    spyOn(pacienteService, "guardar").and.returnValue(of(true));
    notificacion = new Notificacion(
      TITULO_NOTIFICACION_EXITOSA,
      DESCRIPCION_NOTIFICACION_EXITOSA,
      true
    );

    // Act
    component.crear();

    expect(component.notificacion).toEqual(notificacion);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});
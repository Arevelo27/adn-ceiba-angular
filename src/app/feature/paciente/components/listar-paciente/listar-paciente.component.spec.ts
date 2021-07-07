import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { of } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "@core/services/http.service";

import { ListarPacienteComponent } from "./listar-paciente.component";
import { Paciente } from "@shared/copmponents/notificacion/model/paciente";
import { PacienteConsultasService } from "@shared/copmponents/notificacion/service/paciente-consultas.service";
import { PacienteService } from "@paciente/shared/service/paciente.service";

describe("ListarPacienteComponent", () => {
  let component: ListarPacienteComponent;
  let fixture: ComponentFixture<ListarPacienteComponent>;
  let listaPacientes: Paciente[] = [];
  let pacienteConsultasService: PacienteConsultasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPacienteComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPacienteComponent],
      imports: [CommonModule, HttpClientModule, RouterTestingModule],
      providers: [HttpService, PacienteService, PacienteConsultasService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPacienteComponent);
    pacienteConsultasService = TestBed.inject(PacienteConsultasService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debería crearse el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Debería llamarse el servicio consultar pacientes", () => {
    listaPacientes = [new Paciente(), new Paciente()];
    // Arrange
    const spy = spyOn(pacienteConsultasService,"consultar").and.returnValue(
      of(listaPacientes)
    );
    // Act
    pacienteConsultasService.consultar();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});

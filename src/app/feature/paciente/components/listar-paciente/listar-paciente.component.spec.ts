import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { of } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpService } from "@core/services/http.service";
//import { Notificacion } from "@shared/copmponents/notificacion/model/notificacion";
import { PacienteService } from "@shared/copmponents/notificacion/service/paciente.service";

import { ListarPacienteComponent } from "./listar-paciente.component";
import { Paciente } from "@shared/copmponents/notificacion/model/paciente";

describe("ListarPacienteComponent", () => {
  let component: ListarPacienteComponent;
  let fixture: ComponentFixture<ListarPacienteComponent>;
  let listaPacientes: Paciente[] = [];
  let pacienteService: PacienteService;
  //let notificacion: Notificacion;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPacienteComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarPacienteComponent],
      imports: [CommonModule, HttpClientModule, RouterTestingModule],
      providers: [HttpService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPacienteComponent);
    pacienteService = TestBed.inject(PacienteService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Debería crearse el componente", () => {
    expect(component).toBeTruthy();
  });

  it("Debería llamarse el servicio consultar pacientes", () => {
    listaPacientes = [new Paciente(), new Paciente()];
    // Arrange
    const spy = spyOn(pacienteService,"consultar").and.returnValue(
      of(listaPacientes)
    );
    // Act
    pacienteService.consultar();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});

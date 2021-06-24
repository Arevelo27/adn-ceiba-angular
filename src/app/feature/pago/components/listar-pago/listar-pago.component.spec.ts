import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ListarPagoComponent } from './listar-pago.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PagoService } from '../../shared/service/pago.service';
import { Pago } from '../../shared/model/pago';
import { HttpService } from 'src/app/core/services/http.service';
import { Notificacion } from '@shared/copmponents/notificacion/model/notificacion';

describe('ListarPagoComponent', () => {
  let notificacion: Notificacion;
  let component: ListarPagoComponent;
  let fixture: ComponentFixture<ListarPagoComponent>;
  let pagoService: PagoService;
  const listaPagos: Pago[] = [new Pago('2', '1111758458', 'FV-1983', '1000000.00', '0.00', '2020-02-28', ''),
  new Pago('3', '1111758458', 'FV-1984', '350000.00', '0.00', '2020-02-28', '')];
  const IDENTIFICACION_TEST = '1111758458';
  const IDENTIFICACION_TEST_INEXISTENTE = '32323232';
  const FECHA_ACTUAL = '2021-03-02';
  const pagoTest = new Pago('3', '1111758458', 'FV-1984', '350000.00', '0.00', '2020-02-28', '');
  const TITULO_NOTIFICACION_EXITOSA = '¡Éxito!';
  const DESCRIPCION_NOTIFICACION_EXITOSA = '¡Pago realizado con Exito!';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarPagoComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [PagoService, HttpService]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarPagoComponent);
    pagoService = TestBed.inject(PagoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería ser invalido el formulario si esta vacio', () => {
    expect(component.pagoForm.valid).toBeFalsy();
  });

  it('Debería ser valido el formulario si esta diligenciado', () => {
    component.pagoForm.controls.identificacion.setValue(IDENTIFICACION_TEST);
    expect(component.pagoForm.valid).toBeTruthy();
  });

  it('Debería llamarse el servicio consultar pagos', () => {
    // Arrange
    const spy = spyOn(pagoService, 'consultar').and.returnValue(
      of(listaPagos)
    );
    // Act
    pagoService.consultar();
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('Debería llamarse el servicio que actualiza pagos', () => {
    // Arrange
    const spy = spyOn(pagoService, 'actualizar').and.returnValue(
      of(true)
    );
    // Act
    pagoService.actualizar(pagoTest);
    // Assert
    expect(spy).toHaveBeenCalled();
  });

  it('Debería consultar por cedula', () => {
    // Arrange
    spyOn(pagoService, 'consultarIdentificacion').and.returnValue(
      of(listaPagos)
    );
    component.pagoForm.controls.identificacion.setValue(IDENTIFICACION_TEST);
    // Act
    component.consultarPorCedula();
    // Assert
    expect(component.verPagosPendientes).toEqual(true);
  });

  it('No debería consultar por cedula', () => {
    // Arrange
    spyOn(pagoService, 'consultarIdentificacion').and.returnValue(
      of([])
    );
    component.pagoForm.controls.identificacion.setValue(IDENTIFICACION_TEST_INEXISTENTE);

    // Act
    component.consultarPorCedula();

    // Assert
    expect(component.verPagosPendientes).toEqual(false);
  });

  it('Debería consultar por cedula', () => {
    // Arrange
    spyOn(pagoService, 'consultarIdentificacion').and.returnValue(
      of(listaPagos)
    );
    component.pagoForm.controls.identificacion.setValue(IDENTIFICACION_TEST);
    // Act
    component.consultarPorCedula();
    // Assert
    expect(component.verPagosPendientes).toEqual(true);
  });

  it('Debería obtener la Fecha Actual', () => {
    // Arrange
    let fechaRespuesta = '';

    // Act
    fechaRespuesta = component.obtenerFechaActual();

    // Assert
    expect(fechaRespuesta).toEqual(FECHA_ACTUAL);
  });

  it('Debería limpiar el Formulario', () => {
    // Arrange
    component.pagoForm.controls.identificacion.setValue(IDENTIFICACION_TEST);
    component.verPagosPendientes = true;

    // Act
    component.limpiarFormulario();

    // Assert
    expect(component.pagoForm.get('identificacion').value).toEqual('');
    expect(component.verPagosPendientes).toEqual(false);

  });

  it('Debería realizar el Pago', () => {
    // Arrange
    spyOn(pagoService, 'actualizar').and.returnValue(
      of(true)
    );
    notificacion = new Notificacion(TITULO_NOTIFICACION_EXITOSA, DESCRIPCION_NOTIFICACION_EXITOSA, true);

    // Act
    component.pagar(pagoTest);

    // Assert
    expect(component.notificacion).toEqual(notificacion);

  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

});

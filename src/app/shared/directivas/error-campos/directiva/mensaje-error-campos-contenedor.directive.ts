import { Directive, ViewContainerRef } from '@angular/core';

// tslint:disable:directive-selector
@Directive({
  selector: '[validar]',
})
export class MensajeErrorCamposContenedorDirective {
  constructor(public vcr: ViewContainerRef) {}
}

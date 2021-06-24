/**
 * Pipe para no tener que adicionar la funcion trackByFn en cada componente con un ngFor
 * @Version : 1.0
 *
 * Un ejemplo de como se debería usar en un ngFor
 * - Ejemplo:
 *    *ngFor="let profesor of profesores; ; trackBy: 'id' | trackBy"
 *    O
 *    *ngFor="let usuario of usuarios; ; trackBy: 'email' | trackBy"
 *
 */

import { Pipe, PipeTransform } from '@angular/core';

interface TrackBy {
  [propiedad: string]: <T>(indice: number, elemento: T) => T;
}
const cache: TrackBy = Object.create(null);

@Pipe({
  name: 'trackBy',
  pure: true
})
export class TrackByPipe implements PipeTransform {
  public transform(propiedad: string) {
    if (!cache[propiedad]) {
      cache[propiedad] = function trackBy<T>(_: number, elemento: T): T {
        return elemento[propiedad];
      };
    }
    return cache[propiedad];
  }
}

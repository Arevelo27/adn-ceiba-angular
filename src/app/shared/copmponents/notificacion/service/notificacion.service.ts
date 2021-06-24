import { Injectable } from '@angular/core';
import { Notificacion } from '../model/notificacion';
import swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class NotificacionService {
    constructor() { }

    public emiteAdvertencia(msj: Notificacion): void {

        swal.fire(msj.title, msj.message, 'warning');
    }

    public emiteError(msj: Notificacion): void {

        swal.fire(msj.title, msj.message, 'error');
    }

    public emiteinfo(msj: Notificacion): void {

        swal.fire(msj.title, msj.message, 'info');
    }
}

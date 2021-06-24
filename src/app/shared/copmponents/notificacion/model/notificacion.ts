export class Notificacion {
  title: string;
  message: string;
  type: string;
  status: boolean;

  constructor(title: string, message: string, status: boolean) {
    this.title = title;
    this.message = message;
    this.status = status;
  }

}

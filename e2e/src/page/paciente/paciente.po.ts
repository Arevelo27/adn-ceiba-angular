import { by, element } from "protractor";

export class PacientePage {
  private linkCrearPaciente = element(by.id("linkCrearPaciente"));
  private linkListarPacientes = element(by.id("linkListarPaciente"));
  private inputNombresPaciente = element(by.id("nombrePaciente"));
  private inputApellidosPaciente = element(by.id("apellidoPaciente"));
  private inputIdentficacionPaciente = element(by.id("identificacionPaciente"));
  private inputDireccionPaciente = element(by.id("direccionPaciente"));
  private inputTelefonoPaciente = element(by.id("telefonoPaciente"));
  private inputEmailPaciente = element(by.id("correoPaciente"));
  private btnCrearPaciente = element(by.id("btnCrearPaciente"));
  private btnLinkEditarPaciente = element(by.id("btnLinkEditarPaciente1"));
  private btnEditarPacienteItem = element(by.id("btnEditarPaciente"));
  private btnLinkEliminarPaciente = element(by.id("btnLinkEliminarPaciente31"));
  private listaPacientes = element.all(by.tagName("tr"));

  async clickBotonCrearPacientes() {
    await this.linkCrearPaciente.click();
  }

  async clickBotonListarPacientes() {
    await this.linkListarPacientes.click();
  }

  async ingresarNombres(nombresPaciente) {
    await this.inputNombresPaciente.sendKeys(nombresPaciente);
  }

  async ingresarApellido(apellidosPaciente) {
    await this.inputApellidosPaciente.sendKeys(apellidosPaciente);
  }

  async ingresarIdentficacion(identficacion) {
    await this.inputIdentficacionPaciente.sendKeys(identficacion);
  }

  async ingresarDireccion(direccionPaciente) {
    await this.inputDireccionPaciente.clear();
    await this.inputDireccionPaciente.sendKeys(direccionPaciente);
  }

  async ingresarTelefono(telefonoPaciente) {
    await this.inputTelefonoPaciente.sendKeys(telefonoPaciente);
  }

  async ingresarEmail(emailPaciente) {
    await this.inputEmailPaciente.sendKeys(emailPaciente);
  }

  async clickBotonCrearPacientesNuevo() {
    await this.btnCrearPaciente.click();
  }

  async clickBotonLinkEditarPacientes() {
    await this.btnLinkEditarPaciente.click();
  }

  async clickBotonEditarPacientesItem() {
    await this.btnEditarPacienteItem.click();
  }

  async clickBotonLinkEliminarPaciente() {
    await this.btnLinkEliminarPaciente.click();
  }

  async contarPacientes() {
    return this.listaPacientes.count();
  }

  async contar() {
    let count = 0;
    this.listaPacientes.then(() => {
      this.listaPacientes.each(() => {
        count++;
      });
    });
    return count;
  }
}

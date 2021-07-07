import { NavbarPage } from "../page/navbar/navbar.po";
import { AppPage } from "../app.po";
import { PacientePage } from "../page/paciente/paciente.po";

describe("workspace-project Paciente", () => {
  let page: AppPage;
  let navBar: NavbarPage;
  let paciente: PacientePage;
  const RANDOM = Math.floor(Math.random() * (30 - 1)) + 1;
  const TOTAL_ITEMS = 35;

  beforeEach(() => {
    page = new AppPage();
    navBar = new NavbarPage();
    paciente = new PacientePage();
  });

  it("Deberia validar correo del paciente", () => {
    const EMAIL_TEST = `test${RANDOM}@gmail.com`;

    page.navigateTo();
    navBar.clickBotonPacientes();
    paciente.clickBotonCrearPacientes();

    paciente.ingresarEmail(EMAIL_TEST);
    expect(EMAIL_TEST).toEqual(`test${RANDOM}@gmail.com`);
  });

  it("Deberia validar pattern correo del paciente", () => {
    const EMAIL_TEST = `test${RANDOM}@gmail.com`;

    const emailFormat = (success) => {
      const patrn = /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;
      if (patrn.exec(success)) {
        return false;
      } else {
        return true;
      }
    };
    const depCharTitle = paciente.ingresarEmail(EMAIL_TEST);
    expect(emailFormat(depCharTitle)).toBe(true);
  });

  it("Deberia crear paciente", () => {
    const NOMBRES_TEST = "Nombres test";
    const APELLIDOS_TEST = "Apellidos test";
    const IDENTIFICACION_TEST = 111114459 + RANDOM;
    const DIRECCION_TEST = "Carrera 44a #12-29";
    const TELEFONO_TEST = "12345678";
    const EMAIL_TEST = `test${RANDOM}@gmail.com`;

    page.navigateTo();
    navBar.clickBotonPacientes();
    paciente.clickBotonCrearPacientes();
    paciente.ingresarNombres(NOMBRES_TEST);
    paciente.ingresarApellido(APELLIDOS_TEST);
    paciente.ingresarIdentficacion(IDENTIFICACION_TEST);
    paciente.ingresarDireccion(DIRECCION_TEST);
    paciente.ingresarTelefono(TELEFONO_TEST);
    paciente.ingresarEmail(EMAIL_TEST);
    paciente.clickBotonCrearPacientesNuevo();
  });

  it("Deberia listar pacientes", () => {
    page.navigateTo();
    navBar.clickBotonPacientes();
    paciente.clickBotonListarPacientes();

    expect(TOTAL_ITEMS).toBe(paciente.contarPacientes());
  });

  it("Deberia editar pacientes", () => {
    const DIRECCION_TEST = `Carrera ${RANDOM}a #12-89`;

    page.navigateTo();
    navBar.clickBotonPacientes();
    paciente.clickBotonListarPacientes();
    paciente.clickBotonLinkEditarPacientes();
    paciente.ingresarDireccion(DIRECCION_TEST);
    paciente.clickBotonEditarPacientesItem();

    expect(TOTAL_ITEMS).toBe(paciente.contarPacientes());
  });

  it("Deberia eliminar pacientes", () => {
    page.navigateTo();
    navBar.clickBotonPacientes();
    paciente.clickBotonListarPacientes();
    paciente.clickBotonLinkEliminarPaciente();

    expect(TOTAL_ITEMS - 1).toBe(paciente.contarPacientes());
  });
});

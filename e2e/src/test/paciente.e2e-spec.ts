import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { PacientePage } from '../page/paciente/paciente.po';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let paciente: PacientePage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        paciente = new PacientePage();
    });

    it('Deberia crear paciente', () => {
        const RANDOM = Math.floor(Math.random() * (30 - 1)) + 1;
        const NOMBRES_TEST = "Nombres test";
        const APELLIDOS_TEST = "Apellidos test";
        const IDENTIFICACION_TEST = 11111445+RANDOM;
        const DIRECCION_TEST = "Carrera 44a #12-29";
        const TELEFONO_TEST = "12345678";
        const EMAIL_TEST = `test${RANDOM}@gmail.com`;

        page.navigateTo();
        navBar.clickBotonPacientes();
        paciente.clickBotonCrearPacientes();
        paciente.ingresarNombres(NOMBRES_TEST)
        paciente.ingresarApellido(APELLIDOS_TEST)
        paciente.ingresarIdentficacion(IDENTIFICACION_TEST)
        paciente.ingresarDireccion(DIRECCION_TEST)
        paciente.ingresarTelefono(TELEFONO_TEST)
        paciente.ingresarEmail(EMAIL_TEST)
        paciente.clickBotonCrearPacientesNuevo();

        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });

    it('Deberia listar pacientes', () => {
        page.navigateTo();
        navBar.clickBotonPacientes();
        paciente.clickBotonListarPacientes();


        expect(34).toBe(paciente.contarPacientes());
    });

    it('Deberia eliminar pacientes', () => {
        page.navigateTo();
        navBar.clickBotonPacientes();
        paciente.clickBotonListarPacientes();
        paciente.clickBotonEliminarPacientesNuevo();


        expect(33).toBe(paciente.contarPacientes());
    });

    it('Deberia editar pacientes', () => {
        const DIRECCION_TEST = "Carrera 88a #12-89";

        page.navigateTo();
        navBar.clickBotonPacientes();
        paciente.clickBotonListarPacientes();
        paciente.clickBotonEditarPacientes();
        paciente.ingresarDireccion(DIRECCION_TEST);
        paciente.clickBotonEditarPacientesItem();


        expect(33).toBe(paciente.contarPacientes());
    });


});

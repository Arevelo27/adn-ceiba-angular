import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrearPacienteComponent } from "./components/crear-paciente/crear-paciente.component";
import { EditarPacienteComponent } from "./components/editar-paciente/editar-paciente.component";
import { ListarPacienteComponent } from "./components/listar-paciente/listar-paciente.component";
import { PacienteComponent } from "./components/paciente/paciente.component";

const routes: Routes = [
  {
    path: "",
    component: PacienteComponent,
    children: [
      {path: "crear", component: CrearPacienteComponent},
      {path: "edicion", component: EditarPacienteComponent},
      {path: "listar", component: ListarPacienteComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteRoutingModule {}
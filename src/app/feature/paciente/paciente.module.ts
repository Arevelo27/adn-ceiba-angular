import { NgModule } from '@angular/core';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './components/paciente/paciente.component';
import { CrearPacienteComponent } from './components/crear-paciente/crear-paciente.component';
import { EditarPacienteComponent } from './components/editar-paciente/editar-paciente.component';
import { ListarPacienteComponent } from './components/listar-paciente/listar-paciente.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    PacienteComponent,
    CrearPacienteComponent,
    ListarPacienteComponent,
    EditarPacienteComponent
  ],
  imports: [
    PacienteRoutingModule,
    SharedModule
  ],
  providers: [],
})
export class PacienteModule { }

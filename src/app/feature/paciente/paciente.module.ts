import { NgModule } from '@angular/core';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './components/paciente/paciente.component';
import { CrearPacienteComponent } from './components/crear-paciente/crear-paciente.component';
import { ListarPacienteComponent } from './components/listar-paciente/listar-paciente.component';
import { SharedModule } from '@shared/shared.module';
import { PacienteService } from '@pago/shared/service/paciente.service';
import { EditarPacienteComponent } from './components/editar-paciente/editar-paciente.component';

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
  providers: [PacienteService],
})
export class PacienteModule { }

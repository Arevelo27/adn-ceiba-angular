import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarPagoComponent } from './components/listar-pago/listar-pago.component';
import { PagoComponent } from './components/pago/pago.component';

const routes: Routes = [
  {
    path: '',
    component: PagoComponent,
    children: [      {
        path: 'pago',
        component: ListarPagoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoRoutingModule { }

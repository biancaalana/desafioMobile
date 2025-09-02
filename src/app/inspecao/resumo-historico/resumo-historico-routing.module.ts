import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumoHistoricoPage } from './resumo-historico.page';

const routes: Routes = [
  {
    path: '',
    component: ResumoHistoricoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumoHistoricoPageRoutingModule {}

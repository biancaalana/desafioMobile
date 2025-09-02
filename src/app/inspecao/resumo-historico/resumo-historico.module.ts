import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumoHistoricoPageRoutingModule } from './resumo-historico-routing.module';

import { ResumoHistoricoPage } from './resumo-historico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumoHistoricoPageRoutingModule
  ],
  declarations: [ResumoHistoricoPage]
})
export class ResumoHistoricoPageModule {}

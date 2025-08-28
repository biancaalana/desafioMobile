import { Injectable } from '@angular/core';
import { Informacoes } from '../_modules/informacoes';
import { Equipamento } from '../_modules/equipamentos';
import { QuantidadeColaborador } from '../_modules/quantidadeColaborador';
import { Colaborador } from '../_modules/colaborador';

@Injectable({
  providedIn: 'root'
})
export class InformacoesService {
  
  private informacoes: Informacoes | undefined;
  private equipamentos: Equipamento |undefined;
  private quantColaboradores: QuantidadeColaborador | undefined;
  private colaborador: Colaborador | undefined;

  setInfo(informacoes: Informacoes) {
    this.informacoes = informacoes;
  }

  getInfo() {
    return this.informacoes;
  }

  setEquipamento(equipamentos: Equipamento) {
    this.equipamentos = equipamentos;
  }

  getEquipamento() {
    return this.equipamentos;
  }

  setQuantColaborador(colaborador: QuantidadeColaborador) {
    this.quantColaboradores = colaborador;
  }

  getQuantColaborador() {
    return this.quantColaboradores;
  }

  setColaborador(colaborador: Colaborador) {
    this.colaborador = colaborador;
  }

  getColaborador() {
    return this.colaborador;
  }
}

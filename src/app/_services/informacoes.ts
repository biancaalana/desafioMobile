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
  private listaColaboradores: Colaborador[] = [];

  // Informações Básicas

  setInfo(informacoes: Informacoes) {
    this.informacoes = informacoes;
  }

  getInfo() {
    return this.informacoes;
  }

  clearInfo() {
    this.informacoes = {
      setor: '',
      data: '',
      horaInicio: '',
      horaTermino: ''
    };
  }

  // Equipamentos de proteção individual

  setEquipamento(equipamentos: Equipamento) {
    this.equipamentos = equipamentos;
  }

  getEquipamento() {
    return this.equipamentos;
  }

  clearEquipamento() {
    this.equipamentos = {
      epiObrigatorio: '',
      epiAdequado: '',
      epiConservacao: '',
      epiLugar: ''
    };
  }

  // Quantidade colaboradores com e sem EPI

  setQuantColaborador(colaborador: QuantidadeColaborador) {
    this.quantColaboradores = colaborador;
  }

  getQuantColaborador() {
    return this.quantColaboradores;
  }

  clearQuantColaborador() {
    this.quantColaboradores = {
      usandoEpi: 0,
      naoUsando: 0,
      total: 0
    };
  }

  // Lista Colaboradores
  
  setColaboradores(colaboradores: Colaborador[]) {
    this.listaColaboradores = [...colaboradores];
  }

  getColaboradores(): Colaborador[] {
    return [...this.listaColaboradores];
  }

  clearColaboradores() {
    this.listaColaboradores = [];
  }

  getQuantidadeColaboradores(): number {
    return this.listaColaboradores.length;
  }

  colaboradorJaExiste(nome: string): boolean {
    return this.listaColaboradores.some(c => 
      c.nome.toLowerCase().trim() === nome.toLowerCase().trim()
    );
  }

  // Limpa todos os campos
  clearAllData() {
    this.clearInfo();
    this.clearEquipamento();
    this.clearQuantColaborador();
    this.clearColaboradores();
  }
}

import { Component, OnInit } from '@angular/core';
import { Colaborador } from 'src/app/_modules/colaborador';
import { Equipamento } from 'src/app/_modules/equipamentos';
import { Informacoes } from 'src/app/_modules/informacoes';
import { QuantidadeColaborador } from 'src/app/_modules/quantidadeColaborador';
import { InformacoesService } from 'src/app/_services/informacoes';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
  standalone: false
})
export class ResumoPage implements OnInit {

  // Variáveis que vão alimentar os cards do resumo
  info: Informacoes | undefined;
  equipamento: Equipamento | undefined;
  quantidadeColaborador: QuantidadeColaborador | undefined;
  //colaboradores: Colaborador | undefined;
  listaColaboradores: Colaborador[] = [];
  
  listaVazia: string = 'Nenhum colaborador registrado';

  constructor(private informacoesService: InformacoesService) { 
    this.info = informacoesService.getInfo();
    this.equipamento = informacoesService.getEquipamento();
    this.quantidadeColaborador = informacoesService.getQuantColaborador();
  }

  ngOnInit() {
    // Carrega a lista de colaboladores do serviço
    this.listaColaboradores = this.informacoesService.getColaboradores();
  }

  // Obtém a quantidade de colaboradores da lista
  getQuantidadeColaboradores(): number {
    return this.informacoesService.getQuantidadeColaboradores();
  }

  salvarInspecao() {
    this.informacoesService.clearInfo();
    this.informacoesService.clearEquipamento();
    this.informacoesService.clearColaboradores();
    this.informacoesService.clearQuantColaborador();
  }
}

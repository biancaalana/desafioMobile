import { Component, OnInit } from '@angular/core';
import { HistoricoResumo } from 'src/app/_modules/historicoResumo';
import { Historicoservice } from 'src/app/_services/historicoservice';

@Component({
  selector: 'app-resumo-historico',
  templateUrl: './resumo-historico.page.html',
  styleUrls: ['./resumo-historico.page.scss'],
  standalone: false
})
export class ResumoHistoricoPage implements OnInit {

  resumo: HistoricoResumo[] = [];

  constructor(public historicoService: Historicoservice) {
    //Carrega os dados da inspeção do serviço
    this.resumo = this.historicoService.getResumo();
  }

  ngOnInit() {
    this.retornaResumo()
  }

  retornaResumo() {
    this.resumo = [
      {
        informacoesBasicas: { 
          setor: 'Produção', 
          data: '10/04/2025', 
          horaInicio: '10:00', 
          horaTermino: '11:00' 
        },
        equipamentosIndividuais: { 
          epiObrigatorio: 'SIM', 
          epiAdequado: 'SIM', 
          epiConservacao: 'REGULAR', 
          epiLugar: 'SIM' },
        quantColaboradores: { 
          usandoEpi: 4, 
          naoUsando: 0, 
          total: 4 
        },
        descricaoAtividade: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium condimentum purus, ac iaculis ligula eleifend varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur vehicula ligula sem, eget sollicitudin ipsum gravida at',
        observacoes: 'Fusce leo orci, tincidunt ac metus mollis, vulputate congue lectus. Aenean hendrerit arcu urna, vitae feugiat erat vestibulum vitae. ',
        colaboradores: [
          { nome: 'Teste' },
          { nome: 'Teste Dois' },
          { nome: 'Teste Tres' },
          { nome: 'Teste Quatro' }
        ]
      }
    ]
  }

}

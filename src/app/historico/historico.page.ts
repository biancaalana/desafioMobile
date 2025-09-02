import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HistoricoInspecoes } from '../_modules/historicoInspecoes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  standalone: false
})
export class HistoricoPage implements OnInit {

  inspecoes: HistoricoInspecoes[] = [
    { 
      setor: 'Produção', 
      data: '10/04/2025' 
    },
    { 
      setor: 'Almoxarifado', 
      data: '15/06/2025' 
    },
    { 
      setor: 'Administrativo', 
      data: '21/08/2025' 
    }];

  inspecoesFiltradas: HistoricoInspecoes[] = [];

  opcaoFiltro: string = '';

  constructor(private alertController: AlertController, private router: Router) {
    this.inspecoesFiltradas = [...this.inspecoes];
  }

  ngOnInit() {
    // Determina que sempre inicia ordenando por data decrescente (ultimas inspeções)
    this.ordenaPorData(false);
  }

  historicoResumo() {
    this.router.navigate(['/resumo-historico'])
  }

  // Método Alert Filtros
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Filtrar',
      subHeader: 'Escolha como ordenar as inspeções',
      inputs: [
        {
          name: 'opcao',
          type: 'radio',
          label: 'Setor (A-Z)',
          value: 'setor-az',
          checked: false
        },
        {
          name: 'opcao',
          type: 'radio',
          label: 'Setor (Z-A)',
          value: 'setor-za',
          checked: false
        },
        {
          name: 'opcao',
          type: 'radio',
          label: 'Data (Mais Antiga)',
          value: 'data-crescente',
          checked: false
        },
        {
          name: 'opcao',
          type: 'radio',
          label: 'Data (Mais Recente)',
          value: 'data-decrescente',
          checked: true
        },
        {
          name: 'opcao',
          type: 'radio',
          label: 'Últimos 7 dias',
          value: 'ultimos-7',
          checked: false
        },
        {
          name: 'opcao',
          type: 'radio',
          label: 'Últimos 30 dias',
          value: 'ultimos-30',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Filtro cancelado');
          }
        },
        {
          text: 'Limpar Filtros',
          handler: () => {
            this.limparFiltros();
            console.log('Filtros limpos');
          }
        },
        {
          text: 'Aplicar',
          handler: (opcaoSelecionada) => {
            console.log('Opção selecionada:', opcaoSelecionada);
            this.opcaoFiltro = opcaoSelecionada;
            this.aplicarFiltro();
          }
        }
      ],
    });

    await alert.present();
  }

  // Aplica o filtro conformo for selecionado
  aplicarFiltro() {
    if (!this.opcaoFiltro) {
      console.log('Nenhuma opção selecionada');
      return;
    }

    console.log('Aplicando filtro:', this.opcaoFiltro);

    switch (this.opcaoFiltro) {
      case 'setor-az':
        this.filtrarPorSetorAZ();
        break;
      case 'setor-za':
        this.filtrarPorSetorZA();
        break;
      case 'data-crescente':
        this.ordenaPorData(true);
        break;
      case 'data-decrescente':
        this.ordenaPorData(false);
        break;
      case 'ultimos-7':
        this.filtrarUltimos(7);
        break;
      case 'ultimos-30':
        this.filtrarUltimos(30);
        break;
      default:
        this.limparFiltros();
    }
  }

  // Filtros por setor

  filtrarPorSetorAZ() {
    const inspecoesOrdenadas = this.inspecoesFiltradas.sort((a, b) => a.setor.localeCompare(b.setor))
    return inspecoesOrdenadas;
  }

  filtrarPorSetorZA() {
    const inspecoesOrdenadas = this.inspecoesFiltradas.sort((a, b) => b.setor.localeCompare(a.setor))
    return inspecoesOrdenadas;
  }

  // Filtros por data

  ordenaPorData(crescente: boolean = true) { // Crescente ou Decrescente
    this.inspecoesFiltradas.sort((a, b) => {
      const dataA = this.converterStringParaDate(a.data);
      const dataB = this.converterStringParaDate(b.data);

      const resultado = dataA.getTime() - dataB.getTime();
      return crescente ? resultado : -resultado;
    });
  }

  filtrarUltimos(dias: number) {
    const hoje = new Date();
    const dataLimite = new Date();
    dataLimite.setDate(hoje.getDate() - dias);

    this.inspecoesFiltradas = this.inspecoes.filter(inspecao => {
      const dataInspecao = this.converterStringParaDate(inspecao.data);
      return dataInspecao >= dataLimite;
    });
  }

  filtrarPorDataEspecifica(data: string) {
    this.inspecoesFiltradas = this.inspecoes.filter(inspecao => inspecao.data === data)
  }

  // Limpa os filtros selecionados
  limparFiltros() {
    this.inspecoesFiltradas = [...this.inspecoes];
  }

  // Converte a data de string para date
  private converterStringParaDate(dataString: string): Date {
    const [dia, mes, ano] = dataString.split('/');
    return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  }

  // Método para mostrar qual filtro está ativo
  getFiltroAtivo(): string {
    if (!this.opcaoFiltro) return 'Nenhum filtro ativo';
    
    switch (this.opcaoFiltro) {
      case 'setor-az': return 'Setor (A-Z)';
      case 'setor-za': return 'Setor (Z-A)';
      case 'data-crescente': return 'Data (Mais Antiga)';
      case 'data-decrescente': return 'Data (Mais Recente)';
      case 'ultimos-7': return 'Últimos 7 dias';
      case 'ultimos-30': return 'Últimos 30 dias';
      default: return 'Filtro desconhecido';
    }
  }

  // Método para remover inspeção
  removeInspecao(index: number) {
    //this.inspecoes.splice(index, 1);
    this.inspecoesFiltradas.splice(index, 1);
  }
}

import { Component, OnInit } from '@angular/core';
import { HistoricoInspecoes } from '../_modules/historicoInspecoes';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  standalone: false
})
export class HistoricoPage implements OnInit {

  //inspecoes: String[] = ['Produção', 'Almoxarifado', 'Administrativo'];
  inspecoes: HistoricoInspecoes[] = [
    { setor: 'Produção', data: '10/04/2025' },
    { setor: 'Almoxarifado', data: '15/06/2025' },
    { setor: 'Administrativo', data: '21/08/2025' }];

  inspecoesFiltradas: HistoricoInspecoes[] = [];

  opcaoFiltro: any;

  constructor(private alertController: AlertController) {
    this.inspecoesFiltradas = [...this.inspecoes];
  }

  ngOnInit() {
    this.ordenaPorData(true);
  }

  /*async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Filtrar',
      inputs: [{
        name: 'selecione',
        type: 'radio',
        label: 'Selecione uma opção',
        value: 'selecione',
        checked: true
      },
      {
        name: 'setor',
        type: 'radio',
        label: 'Setor',
        value: 'setor',
        checked: false
      },
      {
        name: 'data',
        type: 'radio',
        label: 'Data',
        value: 'data',
        checked: false
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar selecionado');
          }
        },
        {
          text: 'Selecionar',
          handler: (data) => {
            console.log('Valor selecionado: ' + data);
            this.opcaoFiltro = data;
            if (this.opcaoFiltro == undefined) {
              console.log('Valor undefined');
            } else {
              console.log('Valor: ' + data)
            }
          }
        }],
    });

    await alert.present();
  }*/

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


  verificaOpcaoFiltro() {
    return this.opcaoFiltro == 'setor' ? this.filtrarPorSetorAZ() : this.ordenaPorData();
  }

  filtrarPorSetorAZ() {
    const inspecoesOrdenadas = this.inspecoesFiltradas.sort((a, b) => a.setor.localeCompare(b.setor))
    return inspecoesOrdenadas;
  }

  filtrarPorSetorZA() {
    const inspecoesOrdenadas = this.inspecoesFiltradas.sort((a, b) => b.setor.localeCompare(a.setor))
    return inspecoesOrdenadas;
  }

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

  limparFiltros() {
    this.inspecoesFiltradas = [...this.inspecoes];
  }

  private converterStringParaDate(dataString: string): Date {
    const [dia, mes, ano] = dataString.split('/');
    return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  }

  // Método para debug - mostrar qual filtro está ativo
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
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipamento } from 'src/app/_modules/equipamentos';
import { Informacoes } from 'src/app/_modules/informacoes';
import { QuantidadeColaborador } from 'src/app/_modules/quantidadeColaborador';
import { InformacoesService } from 'src/app/_services/informacoes';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
  standalone: false
})
export class ChecklistPage implements OnInit {

  informacoesForm: FormGroup = new FormGroup({});
  informacoes: Informacoes[] = [];

  equipamento: Equipamento[] = [];
  equipamentoForm: FormGroup = new FormGroup({});
  epis: string[] = ['SIM', 'NAO', 'NA'];
  estadoEpis: string[] = ['SATISFATORIO', 'REGULAR', 'RUIM', 'PESSIMO'];

  colaborador: QuantidadeColaborador[] = [];
  colaboradorForm: FormGroup = new FormGroup({});
  usandoEpi: number = 0;
  naoUsandoEpi: number = 0;
  soma: number = 0;

  constructor(private informacaoFb: FormBuilder, private equipamentoFb: FormBuilder, private colaboradorFb: FormBuilder, private informacoesService: InformacoesService) {
  }

  // Inicializa os metódos ao carregar a página
  ngOnInit() {
    this.totalColaboradores();
    this.initializeForm();
  }

  // Inicializa o Form e valida os campos requeridos
  initializeForm() {
    // Inicializa form informações básicas
    this.informacoesForm = this.informacaoFb.group({
      setor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
    });
    // inicializa form equipamentos de proteção individual
    this.equipamentoForm = this.equipamentoFb.group({
      epiObrigatorio: [''],
      epiAdequado: [''],
      epiConservacao: [''],
      epiLugar: ['']
    });
    //inicializa form contagem de funcionarios
    this.colaboradorForm = this.colaboradorFb.group({
      usandoEpi: ['', [Validators.required]],
      naoUsando: ['', [Validators.required]],
      total: ['']
    });
  }

  // Envia os dados dos campos preenchidos para o resumo
  submitForm() {
    this.informacoesSubmit();
    this.equipamentoSubmit();
    this.quantColaboradorSubmit();
  }

  // Informações Básicas
  // Adiciona no array os dados do card Informções básicas
  informacoesSubmit() {
    if (this.informacoesForm.valid) {
      const formData = this.informacoesForm.value;

      const dataConvertida = this.converterData(formData.data);

      // Adiciona os dados na variavel, para ser salvo no array e form
      let formInfo = {
        setor: formData.setor,
        data: dataConvertida,
        horaInicio: formData.horaInicio,
        horaTermino: formData.horaTermino
      }

      this.informacoes.push(formInfo);
      this.informacoesService.setInfo(formInfo);
    }
  }

  // Coverte a data para o formato dd/mm/aaaa
  converterData(dataString: string): string {
    if (!dataString) return '';

    const partes = dataString.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  // Equipamentos de Proteção Individual
  // Adiciona no array os dados do card Equipamentos
  equipamentoSubmit() {
    let epis = this.equipamentoForm.value;
    if (this.equipamentoForm.valid) {
      this.equipamento.push(epis);
      this.informacoesService.setEquipamento(epis);
    }
  }

  // Contagem de Funcionários
  // Adiciona no array os dados do card Contagem de Funcionários
  quantColaboradorSubmit() {
    let colaborador: QuantidadeColaborador;
    if (this.soma = 0) {
      colaborador = {
        usandoEpi: this.colaboradorForm.value.usandoEpi,
        naoUsando: this.colaboradorForm.value.naoUsando,
        total: 0
      };
    } else {
      colaborador = {
        usandoEpi: this.colaboradorForm.value.usandoEpi,
        naoUsando: this.colaboradorForm.value.naoUsando,
        total: this.totalColaboradores()
      };
    }


    if (this.colaboradorForm.valid) {
      this.colaborador.push(colaborador);
      this.informacoesService.setQuantColaborador(colaborador);
    }
  }

  // Soma a quantidade total de colaboradores
  totalColaboradores() {
    return this.soma = this.usandoEpi + this.naoUsandoEpi;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Informacoes } from 'src/app/_modules/informacoes';
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
  infoSelecionado: Informacoes | undefined;

  epis: string[] = ['SIM', 'NAO', 'NA'];
  estadoEpis: string[] = ['SATISFATORIO', 'REGULAR', 'RUIM', 'PESSIMO'];
  usandoEpi: number = 0;
  naoUsandoEpi: number = 0;
  soma: number = 0;

  constructor(private fb: FormBuilder, private informacoesService: InformacoesService) {
  }

  // Inicializa os metódos ao carregar a página
  ngOnInit() {
    this.totalColaboradores();
    this.initializeForm();
  }

  // Soma a quantidade total de colaboradores
  totalColaboradores() {
    return this.soma = this.usandoEpi + this.naoUsandoEpi;
  }

  // Inicializa o Form e valida os campos requiridos
  initializeForm() {
    this.informacoesForm = this.fb.group({
      setor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      horaInicio: ['', [Validators.required]],
      horaTermino: ['', [Validators.required]],
    });
  }

  // Envia os dados dos campos preenchidos
  submitForm() {
    if (this.informacoesForm.valid) {
      this.informacoes.push(this.informacoesForm.value);
      this.informacoesService.setInfo(this.informacoesForm.value);
      this.informacoesForm.reset;
    }
  }

  /*informacaoSelecionado(info: Informacoes) {
    this.infoSelecionado = info;
    this.informacoesService.setInfo(info);
  }*/

  /*setorInformado(setor: FormGroup) {
    this.informacoesForm = setor;
    this.informacoesService.setUser(setor.setor);
  }*/

}

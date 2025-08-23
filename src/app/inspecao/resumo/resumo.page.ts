import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
  standalone: false
})
export class ResumoPage implements OnInit {

  // Variáveis que vão alimentar os cards do resumo
  setor = 'Produção';
  data = '23/08/2025';
  inicio = '08:00';
  termino = '12:00';

  epiObrigatorio = 'SIM';
  usandoEpi = 'SIM';
  estadoEpi = 'SATISFATÓRIO';
  armazenamentoEpi = 'SIM';

  totalFuncionarios = 20;
  totalUsando = 18;
  totalNaoUsando = 2;

  constructor() { }

  ngOnInit() { }
}

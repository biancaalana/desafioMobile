import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Colaborador } from 'src/app/_modules/colaborador';
import { InformacoesService } from 'src/app/_services/informacoes';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: false
})
export class DetalhesPage implements OnInit {

  descricaoAtividade: string = '';
  observacoes: string = '';
  novoColaborador: FormGroup = new FormGroup({});
  colaboradores: Colaborador[] = [];

  constructor(private router: Router, private informacoesService: InformacoesService, private colaboradorFb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
    this.colaboradores.forEach(value => console.log(value.nome))
   }

  initializeForm() {
    this.novoColaborador = this.colaboradorFb.group({
      nome: ['']
    });
  }

  adicionarColaborador() {
    if(this.novoColaborador.valid) {
      this.colaboradores.push(this.novoColaborador.value);
      this.informacoesService.setColaborador(this.novoColaborador.value)
      this.novoColaborador.reset();
    }
  }

  removerColaborador(index: number) {
    this.colaboradores.splice(index, 1);
  }

  enviarResumo() {
    // Aqui você pode salvar os dados em um serviço ou passar via rota/state
    // Exemplo usando NavigationExtras (Angular Router):
    this.router.navigate(['/resumo'], {
      state: {
        descricao: this.descricaoAtividade,
        observacoes: this.observacoes,
        colaboradores: this.colaboradores
      }
    });
  }
}

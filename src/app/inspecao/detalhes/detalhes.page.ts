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
    // Inicializa os campos do Form
    this.initializeForm();

    // Carrega no array local os colaboradores que já existem no serviço
    this.colaboradores = this.informacoesService.getColaboradores();
   }

  initializeForm() {
    this.novoColaborador = this.colaboradorFb.group({
      nome: ['']
    });
  }

  adicionarColaborador() {
    const nomeColaborador = this.novoColaborador.get('nome')?.value;
    const colaboradorJaExiste: boolean = this.informacoesService.colaboradorJaExiste(nomeColaborador); 

    if(this.novoColaborador.valid && !colaboradorJaExiste && nomeColaborador.trim().length > 0) {
      this.colaboradores.push(this.novoColaborador.value);
      this.informacoesService.setColaboradores(this.colaboradores);
      this.novoColaborador.reset();
    } else {
      if(colaboradorJaExiste) {
        console.warn('Colaborador já existe!');
      } else {
        console.warn('É necessário inserir o nome para adicionar!')
      }
    }
  }

  removerColaborador(index: number) {
    this.colaboradores.splice(index, 1);
    this.informacoesService.setColaboradores(this.colaboradores);
  }

  enviarResumo() {
    // Aqui você pode salvar os dados em um serviço ou passar via rota/state
    // Exemplo usando NavigationExtras (Angular Router):
    /*this.router.navigate(['/resumo'], {
      state: {
        descricao: this.descricaoAtividade,
        observacoes: this.observacoes,
        colaboradores: this.colaboradores
      }
    });*/
  }
}

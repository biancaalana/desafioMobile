import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: false
})
export class DetalhesPage implements OnInit {

  descricaoAtividade: string = '';
  observacoes: string = '';
  novoColaborador: string = '';
  colaboradores: string[] = [];

  constructor(private router: Router) { }

  ngOnInit() { }

  adicionarColaborador() {
    if(this.novoColaborador.trim() !== '') {
      this.colaboradores.push(this.novoColaborador.trim());
      this.novoColaborador = '';
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

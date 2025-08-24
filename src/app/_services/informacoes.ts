import { Injectable } from '@angular/core';
import { Informacoes } from '../_modules/informacoes';

@Injectable({
  providedIn: 'root'
})
export class InformacoesService {
  
  private informacoes: Informacoes | undefined;

  setInfo(informacoes: Informacoes) {
    this.informacoes = informacoes;
  }

  getInfo() {
    return this.informacoes;
  }
}

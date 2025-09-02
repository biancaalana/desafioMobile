import { Injectable } from '@angular/core';
import { HistoricoResumo } from '../_modules/historicoResumo';

@Injectable({
  providedIn: 'root'
})
export class Historicoservice {
  private resumo: HistoricoResumo[] = [];
  
  setResumo(resumo: HistoricoResumo[]) {
    this.resumo = [...resumo];
  }

  getResumo() {
    return [...this.resumo];
  }
}

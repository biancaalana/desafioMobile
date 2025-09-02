import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumoHistoricoPage } from './resumo-historico.page';

describe('ResumoHistoricoPage', () => {
  let component: ResumoHistoricoPage;
  let fixture: ComponentFixture<ResumoHistoricoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumoHistoricoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

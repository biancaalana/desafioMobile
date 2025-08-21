import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
  standalone: false
})
export class ChecklistPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isSelected = false; // Estado inicial do botão

      toggleSelection() {
        this.isSelected = !this.isSelected;
        // Aqui você pode adicionar a lógica para o seu botão selecionar ou deselecionar
      }

}

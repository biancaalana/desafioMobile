import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  totalInspecoes: number = 12;
  totalNaoConformidades: number = 3;

  constructor() {}

}

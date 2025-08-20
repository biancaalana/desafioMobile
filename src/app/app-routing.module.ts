import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'checklist',
    loadChildren: () => import('./inspecao/checklist/checklist.module').then( m => m.ChecklistPageModule)
  },
  {
    path: 'detalhes',
    loadChildren: () => import('./inspecao/detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {
    path: 'resumo',
    loadChildren: () => import('./inspecao/resumo/resumo.module').then( m => m.ResumoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

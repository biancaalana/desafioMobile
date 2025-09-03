import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'checklist',
    loadChildren: () => import('./inspecao/checklist/checklist.module').then( m => m.ChecklistPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detalhes',
    loadChildren: () => import('./inspecao/detalhes/detalhes.module').then( m => m.DetalhesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'resumo',
    loadChildren: () => import('./inspecao/resumo/resumo.module').then( m => m.ResumoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then( m => m.HistoricoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'resumo-historico',
    loadChildren: () => import('./inspecao/resumo-historico/resumo-historico.module').then( m => m.ResumoHistoricoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

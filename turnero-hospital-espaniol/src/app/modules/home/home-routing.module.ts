import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReservaPageComponent } from './pages/reserva-page/reserva-page.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'reserva', component: ReservaPageComponent}, 
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }

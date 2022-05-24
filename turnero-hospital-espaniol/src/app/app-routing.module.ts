import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationReservaComponent } from './modules/home/components/confirmation-reserva/confirmation-reserva.component';
import { LoginPageComponent } from './modules/home/pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: 'home', loadChildren: './modules/home/home.module#HomeModule'
  },

  {
    path: 'confirmacionReserva', 
    component: ConfirmationReservaComponent,
    data: {logo: 'assets/img/Confirmacion-de-turno.png'}
  }, 

  {
    path: 'login', 
    component: LoginPageComponent
  },
  {
    path: '**', 
    redirectTo: 'home'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

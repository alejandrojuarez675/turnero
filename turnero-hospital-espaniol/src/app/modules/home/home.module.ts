import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { FormularioComponent } from './components/formulario/formulario.component';
import { GrillaTurnosComponent } from './components/grilla-turnos/grilla-turnos.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FormularioComponent,
    GrillaTurnosComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule,
    MaterialModule,
  ]
})
export class HomeModule { }

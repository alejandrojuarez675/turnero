import { CommonModule, registerLocaleData } from '@angular/common';
import localeAR from '@angular/common/locales/es-AR'; // to register spanish
import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { GrillaTurnosComponent } from './components/grilla-turnos/grilla-turnos.component';
import { ReservaEmailDialogComponent } from './components/reserva-email-dialog/reserva-email-dialog.component';
import { ReservaEmailComponent } from './components/reserva-email/reserva-email.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { SeleccionHorarioComponent } from './components/seleccion-horario/seleccion-horario.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ReservaPageComponent } from './pages/reserva-page/reserva-page.component';
import { ObservationDialogComponent } from './components/observation-dialog/observation-dialog.component';


registerLocaleData(localeAR);

@NgModule({
  declarations: [
    DashboardComponent,
    ReservaPageComponent,
    FormularioComponent,
    GrillaTurnosComponent,
    SchedulerComponent,
    ConfirmationComponent,
    ConfirmationDialogComponent,
    SeleccionHorarioComponent,
    ReservaComponent,
    ReservaEmailComponent,
    ReservaEmailDialogComponent,
    ObservationDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    ReservaEmailDialogComponent,
    ObservationDialogComponent,
  ]
})
export class HomeModule { }

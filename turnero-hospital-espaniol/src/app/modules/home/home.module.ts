import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  exports: [
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class MaterialModule {}

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule,
    MaterialModule,
  ]
})
export class HomeModule { }

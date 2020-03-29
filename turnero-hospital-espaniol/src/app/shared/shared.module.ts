import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { CoreModule } from '../core/core.module';
import { ErrorControlComponent } from './components/errors/error-control/error-control.component';

@NgModule({
  declarations: [
    ErrorControlComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatSnackBarModule
  ],
  exports: [
    ErrorControlComponent,
    CoreModule,
  ],
  entryComponents: [
  ]
})
export class SharedModule { }

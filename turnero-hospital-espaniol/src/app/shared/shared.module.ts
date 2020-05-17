import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { CoreModule } from '../core/core.module';
import { ErrorControlComponent } from './components/errors/error-control/error-control.component';
import { CustomDateAdapter, MY_DATE_FORMATS } from './adapters/common';

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
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS  },
  ]
})
export class SharedModule { 

}

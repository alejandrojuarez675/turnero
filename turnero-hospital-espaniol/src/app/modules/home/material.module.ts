import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// tslint:disable-next-line: max-line-length
import { MatButtonModule, MatDialogModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule, MatAutocompleteModule, MatTooltipModule, MatIconModule,MatRadioModule } from '@angular/material';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CustomDateAdapter, MY_DATE_FORMATS } from '../../shared/adapters/common';

@NgModule({
    exports: [
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatIconModule,
        FormsModule,
        MatRadioModule
    ],
    declarations: [],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
        { provide: DateAdapter, useClass: CustomDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS  },
    
      ]
})
export class MaterialModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
      dateAdapter.setLocale('es-AR');
    }
  }

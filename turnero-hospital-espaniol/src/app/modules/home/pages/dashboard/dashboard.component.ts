import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as FormActions from '../../../../core/store/actions/form.actions';
import * as FormSelectors from '../../../../core/store/selectors/form.selectors';
import { CentroAtencion, Especialidad, Formulario, ObraSocial, Plan } from '../../../../shared/models/datos.models';
import { BusquedaProfesionalesRequest } from '../../../../shared/models/request.models';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

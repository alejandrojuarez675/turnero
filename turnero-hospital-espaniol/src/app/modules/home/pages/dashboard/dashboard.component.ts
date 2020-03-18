import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Formulario } from '../../../../shared/models/datos.models';
import { Store, select } from '@ngrx/store';
import { getObraSociales } from '../../../../core/store/actions/form.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form$: Observable<Formulario>;

  constructor(
    private store: Store<{ formulario: Formulario }>
  ) {
    this.form$ = store.pipe(select('formulario'));
  }

  ngOnInit() {
    this.getObraSociales();
  }

  getObraSociales() {
    this.store.dispatch(getObraSociales());
  }

}

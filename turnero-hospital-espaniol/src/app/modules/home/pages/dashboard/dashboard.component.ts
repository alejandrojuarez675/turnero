import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getObraSociales } from '../../../../core/store/actions/form.actions';
import { Formulario, ObraSocial } from '../../../../shared/models/datos.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  obrasSociales$: Observable<ObraSocial[]>;

  constructor(
    private store: Store<{ formulario: Formulario }>
  ) {
    this.obrasSociales$ = store.pipe(select('formulario', 'obrasSociales'));
  }

  ngOnInit() {
    this.getObraSociales();
  }

  getObraSociales() {
    this.store.dispatch(getObraSociales());
  }

}

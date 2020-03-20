import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getObraSociales } from '../../../../core/store/actions/form.actions';
import { Formulario, ObraSocial, Plan } from '../../../../shared/models/datos.models';
import { selectAllObrasSociales, selectPlanes } from '../../../../core/store/selectors/form.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  obrasSociales$: Observable<ObraSocial[]>;
  planes$: Observable<Plan[]>;

  constructor(
    private store: Store<{ formulario: Formulario }>
  ) {
    this.obrasSociales$ = store.select(selectAllObrasSociales);
    this.planes$ = store.select(selectPlanes);
  }

  ngOnInit() {
    this.getObraSociales();
  }

  getObraSociales() {
    this.store.dispatch(getObraSociales());
  }

}

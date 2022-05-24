import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Contexto, Formulario, Usuario } from '../../../../shared/models/datos.models';
import * as FormActions from '../../../../core/store/actions/contexto.actions';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ReservaActions from '../../../../core/store/actions/reserva.actions';
import * as ReservacionActions from '../../../../core/store/actions/reservacion.actions';
import * as ContextSelectors from '../../../../core/store/selectors/contexto.selectors';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  esAnonimo$: Observable<boolean>;

  constructor(
    private store: Store<{ contexto: Contexto }>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.esAnonimo$ = this.store.select(ContextSelectors.getEsAnonimo);
  }


  toLogin() {
    this.logout();
    this.router.navigate(['login']);
  }

  toSeleccionPaciente() {
    this.router.navigate(['login']);
  }

  logout() {
    this.store.dispatch(ContextoActions.setToken({ token: undefined }));
    this.store.dispatch(FormActions.cleanStore());
    this.store.dispatch(ContextoActions.cleanStore());
    this.store.dispatch(CalendarActions.cleanStore());
    this.store.dispatch(ReservaActions.cleanStore());
    this.store.dispatch(ReservacionActions.cleanStore());
  }

}

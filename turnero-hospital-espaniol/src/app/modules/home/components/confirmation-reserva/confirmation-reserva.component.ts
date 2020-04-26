import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as ReservaAction from '../../../../core/store/actions/reserva.actions';
import * as ReservaSelector from '../../../../core/store/selectors/reserva.selectors';
import * as ErrorSelector from '../../../../core/store/selectors/error.selectors';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as ContextSelectors from '../../../../core/store/selectors/contexto.selectors';
import { Turno, ReservaFormulario, Login } from '../../../../shared/models/datos.models';
import { ConfirmacionTurnoRequest } from '../../../../shared/models/request.models';
import { filter } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-confirmation-reserva',
  templateUrl: './confirmation-reserva.component.html',
  styleUrls: ['./confirmation-reserva.component.css']
})
export class ConfirmationReservaComponent implements OnInit {

  codigoReserva: number;
  turnoSelected$: Observable<Turno>;
  turno: Turno;
  loading = false;
  subscription: Subscription;
  errorBackend$: Observable<number>;

  constructor(
    private store: Store<{ reserva: ReservaFormulario }>,
    private route: ActivatedRoute,
  ) {
    this.errorBackend$ = store.select(ErrorSelector.getCountError);
  }

  ngOnInit() {
    this.loading = true;
    this.subscription = this.route.queryParams.subscribe(params => {
      this.codigoReserva = params['reserva'];
    });

    this.errorBackend$.subscribe(() => {
      this.loading = false;
    });

    const reserva = new ConfirmacionTurnoRequest;
    reserva.codigoReserva = this.codigoReserva;

    const login = new Login();
    login.username = environment.username;
    login.password = environment.password;

    this.store.select(ContextSelectors.getToken).pipe(
      filter(token => token === undefined)
    ).subscribe( () => {
      this.store.dispatch(ContextoActions.getToken( { login } ));
      this.store.select(ContextSelectors.getToken).pipe(
        filter(token => (token !== undefined))
      ).subscribe(
        () => {
          this.store.dispatch(ReservaAction.retrieveTurno( { reserva}));
          this.turnoSelected$ = this.store.select(ReservaSelector.getTurnoSelected);
          this.turnoSelected$.subscribe(turno => this.turno = turno);
        }
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngDoCheck(){
    if (this.turno != undefined) {
      this.loading = false;
    }
  }
}

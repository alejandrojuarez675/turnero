import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as ReservaAction from '../../../../core/store/actions/reserva.actions';
import * as ReservaSelector from '../../../../core/store/selectors/reserva.selectors';
import { Turno, ReservaFormulario } from '../../../../shared/models/datos.models';
import { ConfirmacionTurnoRequest } from '../../../../shared/models/request.models';

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

  constructor(
    private store: Store<{ reserva: ReservaFormulario }>,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.loading = true;
    this.subscription = this.route.queryParams.subscribe(params => {
      this.codigoReserva = params['reserva'];
    });

    const reserva = new ConfirmacionTurnoRequest;
    reserva.codigoReserva = this.codigoReserva;
    this.store.dispatch(ReservaAction.retrieveTurno( { reserva}));
    this.turnoSelected$ = this.store.select(ReservaSelector.getTurnoSelected);
    this.turnoSelected$.subscribe(turno => this.turno = turno);

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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  constructor(
    private store: Store<{ reserva: ReservaFormulario }>,
    private route: ActivatedRoute,
  ) {

  }


  ngOnInit() {

    this.route.queryParams
    .subscribe(params => {
      this.codigoReserva = params['reserva'];
    });

    console.log("CODIGO DE RESERVA " + this.codigoReserva);
    const reserva = new ConfirmacionTurnoRequest;
    reserva.codigoReserva = this.codigoReserva;
    this.store.dispatch(ReservaAction.retrieveTurno( { reserva}));
    console.log("LLAMO al select ");
    this.turnoSelected$ = this.store.select(ReservaSelector.getTurnoSelected);
    console.log("Cargo el turno " + this.turnoSelected$);
    this.turnoSelected$.toPromise().then(turno => this.turno = turno);
    console.log("El turno quedo con los datos  " + this.turno);
  }

  cargarDatos() {
    console.log("ENtra al metodo");
    this.turnoSelected$.subscribe(turno => this.turno = turno);
    console.log("queda con turno " + this.turno.codigo);
  }



}
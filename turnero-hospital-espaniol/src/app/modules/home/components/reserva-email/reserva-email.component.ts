import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ReservaActions from '../../../../core/store/actions/reserva.actions';
import * as ReservacionActions from '../../../../core/store/actions/reservacion.actions';
import * as ReservaSelectors from '../../../../core/store/selectors/reserva.selectors';
import * as ReservacionSelectors from '../../../../core/store/selectors/reservacion.selectors';
import { DatosReserva, Reserva, ReservaFormulario } from '../../../../shared/models/datos.models';
import { ReservaEmailDialogComponent } from '../reserva-email-dialog/reserva-email-dialog.component';

@Component({
  selector: 'app-reserva-email',
  templateUrl: './reserva-email.component.html',
  styleUrls: ['./reserva-email.component.css']
})
export class ReservaEmailComponent implements OnInit {

  datosReserva: DatosReserva;
  reserva$: Observable<ReservaFormulario>;


  constructor(
    public dialog: MatDialog,
    private store: Store<{ reservacion: Reserva }>,
  ) {

  }

  ngOnInit() {

    this.datosReserva = new DatosReserva();
    this.store.select(ReservacionSelectors.getReserva).pipe(
    // TODO cambiarlo por codigo reserva cuando ya esté funcionando bien
      filter(x => x != undefined && x.codigo != undefined)
      //filter(x => x !== undefined && x.paciente !== undefined && x.paciente.dni !== undefined)
    ).subscribe(x => {
      this.reserva$ = this.store.select(ReservaSelectors.getReserva);
      this.reserva$.subscribe(reserva => this.datosReserva.paciente = reserva.paciente);
        console.log("Paciente : " + this.datosReserva.paciente != undefined ? this.datosReserva.paciente.nombreApellido : "LLEGA NUll");
      this.datosReserva.reserva = x;
      console.log("Reserva : " + this.datosReserva.reserva != undefined ? this.datosReserva.reserva.codigo : "RESE NULL");
      this.openDialog(this.datosReserva);
      }
    );
  }


  openDialog(datosReserva: DatosReserva): void {
    this.dialog.open(ReservaEmailDialogComponent, { data: { datosReserva: datosReserva }})
      .afterClosed().subscribe( () => {
        this.store.dispatch(ReservaActions.cleanStore());
        this.store.dispatch(ReservacionActions.cleanStore());
        this.store.dispatch(CalendarActions.cleanStore());
      });
  }

}

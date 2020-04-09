import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ReservaActions from '../../../../core/store/actions/reserva.actions';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Calendario, Turno } from '../../../../shared/models/datos.models';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private store: Store<{ calendario: Calendario }>,
  ) {
  }

  ngOnInit() {
    this.store.select(CalendarSelectors.getTurnoSelected).pipe(
      filter(x => x !== undefined)
    ).subscribe(x => this.openDialog(x));
  }


  openDialog(turno: Turno): void {
    this.dialog.open(ConfirmationDialogComponent, { data: { turno }})
      .afterClosed().subscribe( result => {
        if (result) {
          this.store.dispatch(ReservaActions.setTurnoSelected( { turnoSelected: turno }));
        } else {
          this.store.dispatch(CalendarActions.setTurnoSelected(undefined));
          this.store.dispatch(ReservaActions.setTurnoSelected(undefined));
        }
      });
  }

}

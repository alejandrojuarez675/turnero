import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ReservaActions from '../../../../core/store/actions/reserva.actions';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Calendario, Turno } from '../../../../shared/models/datos.models';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { share } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private store: Store<{ calendario: Calendario }>,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.subscription = 
      this.store.select(CalendarSelectors.getTurnoSelected).pipe(
        filter(x => x !== undefined)
      ).subscribe(x => this.openDialog(x));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openDialog(turno: Turno): void {
    this.dialog.open(ConfirmationDialogComponent, { data: { turno }})
      .afterClosed().subscribe( result => {
        if (result) {
          this.store.dispatch(ReservaActions.setTurnoSelected( { turnoSelected: turno}));
          this.router.navigate(['/home/reserva']);
          this.store.dispatch(ContextoActions.setEstado({ newEstado: 5 }));
        } else {
          this.store.dispatch(CalendarActions.setTurnoSelected(undefined));
          this.store.dispatch(ReservaActions.setTurnoSelected(undefined));
        }
      });
  }

}

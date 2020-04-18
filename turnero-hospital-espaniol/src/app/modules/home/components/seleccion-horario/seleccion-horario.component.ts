import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import { Calendario, Turno } from '../../../../shared/models/datos.models';

@Component({
  selector: 'app-seleccion-horario',
  templateUrl: './seleccion-horario.component.html',
  styleUrls: ['./seleccion-horario.component.css']
})
export class SeleccionHorarioComponent implements OnInit {

  horarios$: Observable<Turno[]>;
  horariosLength$: Observable<number>;

  displayedColumns = ['fecha', 'hora', 'profesional', 'observaciones'];

  constructor(
    private store: Store<{ calendario: Calendario }>,
  ) {
    this.horarios$ = store.select(CalendarSelectors.getHorariosDisponibles);
    this.horariosLength$ = store.select(CalendarSelectors.getHorariosDisponiblesLength);
  }

  ngOnInit() {
  }

  onClickTurno(turnoSelected: Turno) {
    this.store.dispatch(CalendarActions.setTurnoSelected({ turnoSelected }));
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ContextoSelectors from '../../../../core/store/selectors/contexto.selectors';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import { Calendario, Turno } from '../../../../shared/models/datos.models';

@Component({
  selector: 'app-seleccion-horario',
  templateUrl: './seleccion-horario.component.html',
  styleUrls: ['./seleccion-horario.component.css']
})
export class SeleccionHorarioComponent implements OnInit {

  estado$: Observable<number>;

  horarios$: Observable<Turno[]>;
  horariosLength$: Observable<number>;

  displayedColumns = ['fecha', 'hora', 'observaciones'];

  constructor(
    private store: Store<{ calendario: Calendario }>,
  ) {

    this.estado$ = store.select(ContextoSelectors.getEstado);

    this.horarios$ = store.select(CalendarSelectors.getHorariosDisponibles);
    this.horariosLength$ = store.select(CalendarSelectors.getHorariosDisponiblesLength);
  }

  ngOnInit() {
  }

  onClickTurno(turnoSelected: Turno) {
    this.store.dispatch(CalendarActions.setTurnoSelected({ turnoSelected }));
  }

}

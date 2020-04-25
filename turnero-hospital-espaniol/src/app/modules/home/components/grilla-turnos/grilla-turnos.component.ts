import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ContextoSelectors from '../../../../core/store/selectors/contexto.selectors';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Calendario, Disponibilidad, Profesional, Turno } from '../../../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest } from '../../../../shared/models/request.models';

@Component({
  selector: 'app-grilla-turnos',
  templateUrl: './grilla-turnos.component.html',
  styleUrls: ['./grilla-turnos.component.css']
})
export class GrillaTurnosComponent implements OnInit {

  estado$: Observable<number>;
  profesionalesDisponibles$: Observable<Disponibilidad[]>;
  profesionalesDisponiblesLenght$: Observable<number>;

  displayedColumns = [
    'profesional.nombreApellido', 'turnoManiana.fecha', 'turnoTarde.fecha', 'profesional.observaciones'
  ];

  constructor(
    private store: Store<{ calendario: Calendario }>,
  ) {

    this.estado$ = store.select(ContextoSelectors.getEstado);

    this.profesionalesDisponibles$ = store.select(
      CalendarSelectors.getProfesionalesDisponibles);

    this.profesionalesDisponiblesLenght$ = store.select(
      CalendarSelectors.getProfesionalesDisponiblesLength
    );

  }

  ngOnInit() {
  }

  onClickTodos() {
    this.store.dispatch(CalendarActions.setProfesionalSelected(undefined));
    this.store.dispatch(ContextoActions.setEstado({ newEstado: 3 }));
    this.store.select(CalendarSelectors.getBusquedaDiasDisponiblesRequest).subscribe(
      (request: BusquedaDiasDisponiblesRequest) => {
        this.store.dispatch(CalendarActions.getDiasDisponibles({ filter: request }));
      }
    );
  }

  onClickProf(profesional: Profesional) {
    this.store.dispatch(CalendarActions.setProfesionalSelected({ profesional }));
    this.store.dispatch(ContextoActions.setEstado({ newEstado: 3 }));
    this.store.select(CalendarSelectors.getBusquedaDiasDisponiblesRequest).subscribe(
      (request: BusquedaDiasDisponiblesRequest) => {
        this.store.dispatch(CalendarActions.getDiasDisponibles({ filter: request }));
      }
    ).unsubscribe();
  }

  onClickTurno(row: Disponibilidad, horario: string) {
    this.store.dispatch(CalendarActions.setProfesionalSelected(undefined));
    const turnoLigthSelected = horario === 'T' ? row.turnoTarde : row.turnoManiana;
    const turnoSelected: Turno = {
      profesional: row.profesional,
      codigo: turnoLigthSelected.codigo,
      centroAtencion: turnoLigthSelected.centroAtencion,
      fecha: turnoLigthSelected.fecha,
      hora: turnoLigthSelected.hora,
      observaciones: turnoLigthSelected.observaciones
    };
    this.store.dispatch(CalendarActions.setTurnoSelected({ turnoSelected }));
  }

}

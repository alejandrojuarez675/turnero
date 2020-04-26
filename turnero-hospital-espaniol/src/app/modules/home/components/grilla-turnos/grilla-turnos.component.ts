import { Component, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import * as ContextoSelectors from '../../../../core/store/selectors/contexto.selectors';
import { Calendario, Disponibilidad, Profesional, Turno } from '../../../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest } from '../../../../shared/models/request.models';

@Component({
  selector: 'app-grilla-turnos',
  templateUrl: './grilla-turnos.component.html',
  styleUrls: ['./grilla-turnos.component.css']
})
export class GrillaTurnosComponent {

  estado$: Observable<number>;
  profesionalesDisponibles$: Observable<Disponibilidad[]>;
  profesionalesDisponiblesLenght$: Observable<number>;

  displayedColumns = [
    'nombreApellido', 'turnoM', 'turnoT','profesional.observaciones'
    // 'profesional.observaciones' // EN MOBILE NO SE VE BIEN (LO SACAMOS SOLO EN MOBILE?)
    // FIXME: es una columna importante pq sirve, por ej, para saber si atiende por obra social o solo particular
    // vamos a consultar si puede ser alguna otra alternativa de como mostrarlo: icono de alerta q muestra la observacion en el hover
  ];

  @ViewChild(MatSort) sort: MatSort;
  datasource = new MatTableDataSource([]);

  constructor(
    private store: Store<{ calendario: Calendario }>,
  ) {

    this.estado$ = store.select(ContextoSelectors.getEstado);

    store.select(CalendarSelectors.getProfesionalesDisponibles).subscribe(
      (disponibilidades) => {
        this.datasource = new MatTableDataSource<any>(disponibilidades
          .map(x => ({
            ...x,
            nombreApellido: x.profesional.nombreApellido,
            turnoM: x.turnoManiana != null ? x.turnoManiana.fecha : "",
            turnoT: x.turnoTarde != null ? x.turnoTarde.fecha : "",
          }))
        );
        this.datasource.sort = this.sort;
      }
    );

    this.profesionalesDisponiblesLenght$ = store.select(
      CalendarSelectors.getProfesionalesDisponiblesLength
    );

  }

  onClickTodos() {
    this.store.dispatch(CalendarActions.setProfesionalSelected(undefined));
    this.store.dispatch(ContextoActions.setEstado({ newEstado: 3 }));
    this.store.select(CalendarSelectors.getBusquedaDiasDisponiblesRequest).subscribe(
      (request: BusquedaDiasDisponiblesRequest) => {
        this.store.dispatch(CalendarActions.getDiasDisponibles({ filter: request }));
      }
    ).unsubscribe();
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
    this.store.dispatch(CalendarActions.setHorariosDisponibles({ horarios: [] }));
    this.store.dispatch(CalendarActions.setDiasDisponibles({ diasDisponibles: [] }));
    this.store.dispatch(CalendarActions.setTurnoSelected({ turnoSelected }));
  }

}

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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-grilla-turnos',
  templateUrl: './grilla-turnos.component.html',
  styleUrls: ['./grilla-turnos.component.css']
})
export class GrillaTurnosComponent {

  estado$: Observable<number>;
  profesionalesDisponibles$: Observable<Disponibilidad[]>;
  profesionalesDisponiblesLenght$: Observable<number>;
  turnoFilter = new FormControl('Todos');

  displayedColumns = [
    'nombreApellido', 'turnoP', 'profesional.observaciones'
  ];

  cambiarColumna(event) {
    if (event.value === "AM") {
      this.displayedColumns = ['nombreApellido', 'turnoM', 'profesional.observaciones'];
    } else if (event.value === "PM") {
      this.displayedColumns = ['nombreApellido', 'turnoT', 'profesional.observaciones'];
    } else {
      this.displayedColumns = ['nombreApellido', 'turnoP', 'profesional.observaciones'];
    }
  }

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
            turnoP: x.turno != null ? x.turno.fecha : "",
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
    const turnoLigthSelected = horario === 'T' ? row.turnoTarde : horario === 'M' ? row.turnoManiana : row.turno;
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

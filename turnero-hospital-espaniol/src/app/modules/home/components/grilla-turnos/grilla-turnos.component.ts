import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ContextoSelectors from '../../../../core/store/selectors/contexto.selectors';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Calendario, Disponibilidad, Profesional, Turno } from '../../../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest } from '../../../../shared/models/request.models';
import { MatSort, MatTableDataSource } from '@angular/material';
import { overrideProvider } from '@angular/core/src/view';

@Component({
  selector: 'app-grilla-turnos',
  templateUrl: './grilla-turnos.component.html',
  styleUrls: ['./grilla-turnos.component.css']
})
export class GrillaTurnosComponent implements OnInit {

  estado$: Observable<number>;
  profesionalesDisponibles$: Observable<Disponibilidad[]>;
  profesionalesDisponiblesLenght$: Observable<number>;
  profesionalesDataSouce: MatTableDataSource<Disponibilidad>;
  profesionalesDisponibles: Disponibilidad[];

  displayedColumns = [
    'profesional.nombreApellido', 'turnoManiana.fecha'
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

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.profesionalesDisponibles$.subscribe(disponibilidad => {
      this.profesionalesDisponibles = disponibilidad
      this.profesionalesDataSouce = new MatTableDataSource<Disponibilidad>(this.profesionalesDisponibles);
      console.log("desp del sort");
      this.profesionalesDataSouce.sort = this.sort;
      console.log("antes del sort");
      this.profesionalesDataSouce.sortingDataAccessor = (data, sortHeaderId: string) => {
        console.log("sortHeaderId " + sortHeaderId);
        return this.getPropertyByPath(data, sortHeaderId);
      };

    }
      
    );
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
    );
  }

  onClickTurno(row: Disponibilidad, horario: string) {
    this.store.dispatch(CalendarActions.setProfesionalSelected(undefined));
    const turnoLigthSelected = horario === 'T' ? row.turnoTarde : row.turnoManiana;
    const turnoSelected: Turno = {
      profesional: row.profesional,
      especialidad: row.especialidad,
      codigo: turnoLigthSelected.codigo,
      centroAtencion: turnoLigthSelected.centroAtencion,
      fecha: turnoLigthSelected.fecha,
      hora: turnoLigthSelected.hora,
      observaciones: turnoLigthSelected.observaciones
    };
    this.store.dispatch(CalendarActions.setTurnoSelected({ turnoSelected }));
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }
}

import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatRadioGroup } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as FormularioSelectors from '../../../../core/store/selectors/form.selectors';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import * as ContextoSelectors from '../../../../core/store/selectors/contexto.selectors';
import { Calendario, Disponibilidad, Profesional, Turno, ProfesionalEspecialidad, Especialidad } from '../../../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest } from '../../../../shared/models/request.models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-grilla-turnos',
  templateUrl: './grilla-turnos.component.html',
  styleUrls: ['./grilla-turnos.component.css']
})
export class GrillaTurnosComponent implements OnInit {

  filtroHora$: Observable<string>;
  turnoFilter: string;

  profesionalesDisponibles$: Observable<Disponibilidad[]>;
  profesionalesDisponiblesLenght$: Observable<number>;
  disponibilidades: Disponibilidad[];
  profComboSelected$: Observable<Profesional>;
  especComboSelected$: Observable<Especialidad>;

  displayedColumns = [
    'nombreApellido', 'turnoP', 'profesional.observaciones'
  ];

  ngOnInit() {
    this.store.dispatch(CalendarActions.setFiltroHora({filtroHora: 'Todos'}));
  }

  cambiarFiltro1(event) {
    if (event != undefined) {
      this.store.dispatch(CalendarActions.setFiltroHora({filtroHora: event.value}));
    } else {
      this.store.dispatch(CalendarActions.setFiltroHora({filtroHora: 'Todos'}));
    }
  }

  cambiarColumna(filtro: string) {
    this.turnoFilter = filtro;

    var list = this.disponibilidades.map( x => ({
      ...x,
      nombreApellido: x.profesional.nombreApellido,
      especialidad: x.profesional.especialidad.nombre,
      turnoM: x.turnoManiana != null ? x.turnoManiana.fecha : "",
      turnoT: x.turnoTarde != null ? x.turnoTarde.fecha : "",
      turnoP: x.turno != null ? x.turno.fecha : "",
    }));
    
    var firstCol = 'nombreApellido';
    /*
    this.especComboSelected$.subscribe(esp => {
      if (esp == undefined || esp.codigo == undefined ) {
        firstCol = 'especialidad';
      }
    });
    */
   
    if (filtro === "AM") {
      this.displayedColumns = [firstCol, 'turnoM', 'profesional.observaciones']; 
      list = list.filter(x => x.turnoManiana != null);

    } else if (filtro === "PM") {
      this.displayedColumns = [firstCol, 'turnoT', 'profesional.observaciones'];
      list = list.filter(x => x.turnoTarde != null);

    } else {
      this.displayedColumns = [firstCol, 'turnoP', 'profesional.observaciones'];
    }
    this.datasource = new MatTableDataSource<any>(list);
    this.datasource.sort = this.sort;
  }

  @ViewChild(MatSort) sort: MatSort;
  datasource = new MatTableDataSource([]);

  constructor(
    private store: Store<{ calendario: Calendario }>,
  ) {

    this.filtroHora$ = store.select(CalendarSelectors.getFiltroHora);
    this.profComboSelected$ = store.select(FormularioSelectors.selectProfComboSelected);
    this.especComboSelected$ = store.select(FormularioSelectors.selectEspecialidadComboSelected);

    store.select(CalendarSelectors.getProfesionalesDisponibles).subscribe(
      (disponibilidades) => {
        this.disponibilidades = disponibilidades;
        this.store.dispatch(CalendarActions.setFiltroHora({filtroHora: 'Todos'}));
        this.cambiarColumna('Todos');
      }
    );

    this.profesionalesDisponiblesLenght$ = store.select(
      CalendarSelectors.getProfesionalesDisponiblesLength
    );

    this.store.select(CalendarSelectors.getFiltroHora).subscribe(
      (filtro) => {
        this.cambiarColumna(filtro);
      }
    );

  }

  onClickTodos() {
    this.store.dispatch(CalendarActions.setProfesionalSelected(undefined));
    this.store.dispatch(CalendarActions.setHorariosDisponibles({ horarios: [] }));
    this.store.dispatch(CalendarActions.setDiasDisponibles({ diasDisponibles: [] }));

    this.store.select(CalendarSelectors.getBusquedaDiasDisponiblesRequest).subscribe(
      (request: BusquedaDiasDisponiblesRequest) => {
        this.store.dispatch(CalendarActions.getDiasDisponibles({ filter: request }));
      }
    ).unsubscribe();

    this.store.dispatch(CalendarActions.setFiltroHora2({filtroHora2: this.turnoFilter}));
  }

  onClickProf(profesional: ProfesionalEspecialidad) {

    this.store.dispatch(CalendarActions.setProfesionalSelected({ profesional }));
    this.store.dispatch(CalendarActions.setHorariosDisponibles({ horarios: [] }));
    this.store.dispatch(CalendarActions.setDiasDisponibles({ diasDisponibles: [] }));
    
    setTimeout(()=> {
      this.store.select(CalendarSelectors.getBusquedaDiasDisponiblesRequest).subscribe(
        (request: BusquedaDiasDisponiblesRequest) => {
          this.store.dispatch(CalendarActions.getDiasDisponibles({ filter: request }));
        }
      ).unsubscribe();
    })
    this.store.dispatch(CalendarActions.setFiltroHora2({filtroHora2: this.turnoFilter}));
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

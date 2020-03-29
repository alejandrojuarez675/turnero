import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  profesionalesDisponibles$: Observable<Disponibilidad[]>;
  profesionalesDisponiblesLenght$: Observable<number>;

  displayedColumns = [
    'profesional.nombreApellido', 'turnoManiana.fecha', 'turnoTarde.fecha'
  ];

  constructor(
    private store: Store<{ calendario: Calendario }>,
  ) {

    this.profesionalesDisponibles$ = store.select(
      CalendarSelectors.getProfesionalesDisponibles);

    this.profesionalesDisponiblesLenght$ = store.select(
      CalendarSelectors.getProfesionalesDisponiblesLength
    );

  }

  ngOnInit() {
  }

  onClickProf(profesional: Profesional) {
    this.store.select(CalendarSelectors.getBusquedaDiasDisponiblesRequest).subscribe(
      (request: BusquedaDiasDisponiblesRequest) => {
        const filter = {...request};
        filter.codigoProfesional = profesional.codigo;
        this.store.dispatch(CalendarActions.getDiasDisponibles({ filter }));
      }
    );
  }

  onClickTurno(row: Disponibilidad, horario: string) {
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
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Calendario, Disponibilidad, Profesional, Turno } from '../../../../shared/models/datos.models';
import { Router, ActivatedRoute } from '@angular/router';

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
    store: Store<{ calendario: Calendario }>,
    private route: ActivatedRoute,
    private router: Router
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
    this.router.navigate([], {
      relativeTo: this.route, queryParams: {
        codigoProfesional: profesional.codigo, lastClick: 'busquedaDiasDisponibles' },
      queryParamsHandling: 'merge',
    });
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

    this.router.navigate([], {
      relativeTo: this.route, queryParams: {
        turnoSelected: JSON.stringify(turnoSelected), lastClick: 'turnoSelected' },
      queryParamsHandling: 'merge',
    });
  }
}

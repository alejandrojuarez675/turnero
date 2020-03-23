import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Calendario, Disponibilidad } from '../../../../shared/models/datos.models';
import { map } from 'rxjs/operators';

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

}

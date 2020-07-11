import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import * as ContextoSelectors from '../../../../core/store/selectors/contexto.selectors';
import { Calendario, Turno, Profesional, ProfesionalEspecialidad } from '../../../../shared/models/datos.models';

@Component({
  selector: 'app-seleccion-horario',
  templateUrl: './seleccion-horario.component.html',
  styleUrls: ['./seleccion-horario.component.css']
})
export class SeleccionHorarioComponent implements OnInit {

  horarios$: Observable<Turno[]>;
  horariosLength$: Observable<number>;
  
  proxTurno: Turno;

  displayedColumns = ['profesional', 'fecha', 'observaciones'];

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

  /*
  onClickProfesional(turnoSelected: Turno) {
    this.proxTurno = turnoSelected;
    this.horarios$.subscribe(hs => {
      hs.forEach(h => {
        if (h.profesional.codigo === turnoSelected.profesional.codigo) {
          if (h.hora.split(" ")[1] <= this.proxTurno.hora.split(" ")[1]) { // am pm
            if (h.hora.split(" ")[1] < this.proxTurno.hora.split(" ")[1]) {
              this.proxTurno = h; // am < pm
            } else if (h.hora.split(":")[0] == "12" && this.proxTurno.hora.split(":")[0] != "12") {
              this.proxTurno = h; // caso especial 12 pm
            } else if (h.hora < this.proxTurno.hora && 
                (h.hora.split(":")[0] == this.proxTurno.hora.split(":")[0]
                  || this.proxTurno.hora.split(":")[0] != "12")) {
              this.proxTurno = h; // misma franja horaria, compara horario
            }
          }
        }
      }) 
    }).unsubscribe();
  }
  */
}

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarEvent, CalendarView, CalendarMonthViewBeforeRenderEvent, CalendarDayViewBeforeRenderEvent, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ContextoSelectors from '../../../../core/store/selectors/contexto.selectors';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Calendario, Profesional, DisponibilidadDiasStore, Disponibilidad, Especialidad } from '../../../../shared/models/datos.models';
import { BusquedaHorariosRequest } from '../../../../shared/models/request.models';
import { disponibilidadDiasToCalendarEvent, toMonthString } from './scheduler-utils';


@Component({
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],

})
export class SchedulerComponent {

  estado$: Observable<number>;

  dias$: Observable<DisponibilidadDiasStore[]>;
  events$: Observable<CalendarEvent[]>;
  eventsLength$: Observable<number>;
  profesionalSelected$: Observable<Profesional>;
  profesionalesDisponibles$: Observable<Disponibilidad[]>;
  especialidad: Especialidad;


  events: CalendarEvent<any>[];
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean;
  view: CalendarView = CalendarView.Month;
  refresh: Subject<any> = new Subject();
  locale: string = 'es-AR';

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      day.badgeTotal = day.events.filter(
        (event) => event.meta.incrementsBadgeTotal
      ).length;
    });

    this.dias$ = this.store.select(CalendarSelectors.getDiasDisponibles);
    this.dias$.subscribe(x => 
      x.forEach(d => {
        renderEvent.body.forEach(day => {
          var a = true;
          if (a && day.date.getDate() == d.fecha.getDate() && 
            day.date.getMonth() == d.fecha.getMonth() && 
            day.date.getFullYear() == d.fecha.getFullYear()) {
            a = false;
            if (d.conDisponibilidad) {
              day.cssClass =  'lightskyblue';
            } else {
              day.cssClass = 'lightslategray';
            }
          }
        });
      })
    );
  }

  constructor(
    private store: Store<{ calendario: Calendario }>,
  ) {

    this.estado$ = store.select(ContextoSelectors.getEstado);

    // crea los eventos (puntitos) 
    this.events$ = store.select(CalendarSelectors.getDiasTurnosDisponibles).pipe(
      map((ev) => ev.map(x => disponibilidadDiasToCalendarEvent(x)))
    );
    this.events$.subscribe((e) => this.events = e);

    this.eventsLength$ = store.select(CalendarSelectors.getDiasDisponiblesLength);

    this.profesionalSelected$ = store.select(CalendarSelectors.getProfesionalSelected);
    this.profesionalesDisponibles$ = store.select(CalendarSelectors.getProfesionalesDisponibles);
    this.profesionalesDisponibles$.subscribe(disponibilidad => {
      disponibilidad.filter(x => {
        this.especialidad = x.profesional.especialidad;
      })
    })
  };

  dayClicked({ date }: { date: Date }): void {
    if (this.isPartOfEvents(this.events, date)) {
      this.store.dispatch(ContextoActions.setEstado({ newEstado: 4 }));
      this.store.dispatch(CalendarActions.setFechaSelected({ fecha: date }));
      this.store.select(CalendarSelectors.getBusquedaHorariosRequest).subscribe(
        (filtro: BusquedaHorariosRequest) =>
          this.store.dispatch(CalendarActions.getHorariosDisponibles({ filter: filtro }))
      ).unsubscribe();
    } else {
      this.store.dispatch(ContextoActions.setEstado({ newEstado: 3 }));
      this.store.dispatch(CalendarActions.setHorariosDisponibles({ horarios: [] }));
    }
  }

  isPartOfEvents(events: CalendarEvent[], date: Date) {
    return events.map(x => {
      x.start.setHours(0, 0, 0, 0);
      return x.start.getTime();
    }).indexOf(date.getTime()) !== -1;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  _toMonthString(month: number) {
    return toMonthString(month);
  }
}

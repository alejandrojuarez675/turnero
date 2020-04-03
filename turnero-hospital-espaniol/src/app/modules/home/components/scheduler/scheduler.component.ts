import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Calendario } from '../../../../shared/models/datos.models';
import { disponibilidadDiasToCalendarEvent, toMonthString } from './scheduler-utils';
import { BusquedaHorariosRequest } from '../../../../shared/models/request.models';


@Component({
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent {

  events$: Observable<CalendarEvent[]>;
  eventsLength$: Observable<number>;

  events: CalendarEvent<any>[];
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean;
  view: CalendarView = CalendarView.Month;
  refresh: Subject<any> = new Subject();


  constructor(
    private store: Store<{ calendario: Calendario }>,
  ) {

    this.events$ = store.select(CalendarSelectors.getDiasDisponibles).pipe(
      map((ev) => ev.map(x => disponibilidadDiasToCalendarEvent(x)))
    );
    this.events$.subscribe((e) => this.events = e);

    this.eventsLength$ = store.select(CalendarSelectors.getDiasDisponiblesLength);

  }

  dayClicked({ date }: { date: Date }): void {
    if (this.isPartOfEvents(this.events, date)) {
      this.store.dispatch(CalendarActions.setFechaSelected({ fecha: date }));
      this.store.select(CalendarSelectors.getBusquedaHorariosRequest).subscribe(
        (filtro: BusquedaHorariosRequest) =>
        this.store.dispatch(CalendarActions.getHorariosDisponibles({ filter: filtro }))
      );
    }
  }

  isPartOfEvents(events: CalendarEvent[], date: Date) {
    return events.map(x => x.start.getTime()).indexOf(date.getTime()) !== -1;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  _toMonthString(month: number) {
    return toMonthString(month);
  }
}

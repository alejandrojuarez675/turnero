import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Calendario } from '../../../../shared/models/datos.models';
import { disponibilidadDiasToCalendarEvent, toMonthString } from './scheduler-utils';


@Component({
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent {

  events$: Observable<CalendarEvent[]>;
  eventsLength$: Observable<number>;

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean;
  view: CalendarView = CalendarView.Month;
  refresh: Subject<any> = new Subject();


  constructor(
    store: Store<{ calendario: Calendario }>,
  ) {

    this.events$ = store.select(CalendarSelectors.getDiasDisponibles).pipe(
      map((ev) => ev.map(x => disponibilidadDiasToCalendarEvent(x)))
    );

    this.eventsLength$ = store.select(CalendarSelectors.getDiasDisponiblesLength);

  }

  dayClicked({ date }: { date: Date }): void {
    alert('click en ' + date);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  _toMonthString(month: number) {
    return toMonthString(month);
  }
}

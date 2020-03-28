import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject, Scheduler, from } from 'rxjs';
import { toMonthString } from './scheduler-utils';


const colors: any = {
  blue: {
    primary: '#1061a7',
    secondary: '#1061a7'
  },
};

@Component({
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent {

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean;
  view: CalendarView = CalendarView.Month;

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: endOfDay(new Date('2020-04-01')),
      title: 'Evento Ejemplo',
      color: colors.blue,
    },
  ];

  constructor() {}

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

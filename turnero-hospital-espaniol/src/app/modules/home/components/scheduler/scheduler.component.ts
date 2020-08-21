import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation, HostListener, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
// tslint:disable-next-line: max-line-length
import { CalendarDateFormatter, CalendarEvent, CalendarMonthViewBeforeRenderEvent, CalendarView } from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Calendario, Disponibilidad, DisponibilidadDiasStore, Especialidad, ProfesionalEspecialidad } from '../../../../shared/models/datos.models';
import { BusquedaHorariosRequest } from '../../../../shared/models/request.models';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { disponibilidadDiasToCalendarEvent, toMonthString } from './scheduler-utils';

@Component({
  selector: 'app-scheduler',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ],
})
export class SchedulerComponent {

  filtroHora$: Observable<string>;
  filtroHora2$: Observable<string>;
  turnoFilter2: string;

  dias$: Observable<DisponibilidadDiasStore[]>;
  events$: Observable<CalendarEvent[]>;
  eventsLength$: Observable<number>;
  profesionalSelected$: Observable<ProfesionalEspecialidad>;
  profesionalesDisponibles$: Observable<Disponibilidad[]>;
  especialidad: Especialidad;


  events: CalendarEvent<any>[];
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean;
  view: CalendarView = CalendarView.Month;
  refresh: Subject<any> = new Subject();
  locale = 'es-AR';

  @ViewChild('scrollFrame') private scrollFrame: ElementRef;
  isScrolled: boolean = false;
  private target: ElementRef;
  @ViewChild('target') set content(content: ElementRef) {
    if(content) { // initially setter gets called with undefined
        this.target = content;
    }
 }
  
  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      day.badgeTotal = day.events.filter(
        (event) => event.meta.incrementsBadgeTotal
      ).length;
    });

    

    this.dias$ = this.store.select(CalendarSelectors.getDiasDisponibles);
    this.dias$.subscribe(x =>
    {this.scrollToBottom();
      x.forEach(d => {
        renderEvent.body.forEach(day => {
          let a = true;
          if (a && day.date.getDate() === d.fecha.getDate() &&
            day.date.getMonth() === d.fecha.getMonth() &&
            day.date.getFullYear() === d.fecha.getFullYear()) {
            a = false;

            if (d.conDisponibilidadTM || d.conDisponibilidadTT) {
              day.cssClass =  'lightskyblue';
            } else {
              day.cssClass = 'lightslategray';
            }
          }
        });
      })}
    );
  }

  cambiarFiltro2(event) {
    if (event != undefined) {
      this.store.dispatch(CalendarActions.setFiltroHora2({filtroHora2: event.value}));
    } else {
      this.store.dispatch(CalendarActions.setFiltroHora2({filtroHora2: 'Todos'}));
    }
  }


  constructor(
    private store: Store<{ calendario: Calendario }>,
  ) {

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
      });
    });

    this.filtroHora2$ = store.select(CalendarSelectors.getFiltroHora);
    
    this.store.select(CalendarSelectors.getFiltroHora2).subscribe(
      (filtro) => {
        this.cambiarColumna2(filtro);
      }
    );
  }

  cambiarColumna2(filtro: string) {
    this.turnoFilter2 = filtro;

    this.events$ = this.store.select(CalendarSelectors.getDiasTurnosDisponibles).pipe(
      map((ev) => ev.map(x => disponibilidadDiasToCalendarEvent(x)))
    );
    this.events$.subscribe((e) => this.events = e);

    this.eventsLength$ = this.store.select(CalendarSelectors.getDiasDisponiblesLength);
  }

  dayClicked({ date }: { date: Date }): void {
    if (this.isPartOfEvents(this.events, date)) {
      this.store.dispatch(CalendarActions.setFechaSelected({ fecha: date }));
      this.store.dispatch(CalendarActions.setHorariosDisponibles({ horarios: [] }));
      this.store.select(CalendarSelectors.getBusquedaHorariosRequest).subscribe(
        (filtro: BusquedaHorariosRequest) =>
          this.store.dispatch(CalendarActions.getHorariosDisponibles({ filter: filtro }))
      ).unsubscribe();
    } else {
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

  private scrollToBottom(): void {
    console.log("ENTRA con " + this.scrollFrame.nativeElement.scrollHeight);
    console.log("Scroll? " + this.isScrolled);
    // if (this.target != undefined) {
    //   console.log(this.target.nativeElement.scrollHeight );
    //   window.scroll({
    //     top: this.target.nativeElement.scrollHeight,
    //     left: 0,
    //     behavior: 'smooth'
    //   });
    // }
    // if (!this.isScrolled) {
      window.scroll({
        top: 810,
        left: 0,
        behavior: 'smooth'
      });
    //   this.isScrolled = true;
    // }
  }

  // private isUserNearBottom(): boolean {
  //   const threshold = 150;
  //   const position = window.scrollY + window.innerHeight;
  //   const height = document.body.scrollHeight;
  //   return position > height - threshold;
  // }
}

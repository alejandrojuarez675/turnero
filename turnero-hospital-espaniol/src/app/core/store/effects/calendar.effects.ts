import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ServiceService } from '../../services/service.service';
import * as CalendarActions from '../actions/calendar.actions';
import * as ErrorActions from '../actions/error.actions';

@Injectable()
export class CalendarEffects {

    getDiasDisponibles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CalendarActions.GET_DIAS_DISPONIBLES),
            switchMap((payload: any) => this.service.busquedaDiasDisponibles(payload.filter).pipe(
                map((diasDisponibles) =>
                        ({ type: CalendarActions.SET_DIAS_DISPONIBLES, diasDisponibles })),
                catchError((error: Error) =>
                        of({ type: ErrorActions.SHOW_ERROR, error: error.message })
                )
            ))
        )
    );

    getHorariosDisponibles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CalendarActions.GET_HORARIOS_DISPONIBLES),
            switchMap((payload: any) => this.service.busquedaHorarios(payload.filter).pipe(
                map((horarios) =>
                        ({ type: CalendarActions.SET_HORARIOS_DISPONIBLES, horarios })),
                catchError((error: Error) =>
                        of({ type: ErrorActions.SHOW_ERROR, error: error.message })
                )
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private service: ServiceService,
    ) { }
}

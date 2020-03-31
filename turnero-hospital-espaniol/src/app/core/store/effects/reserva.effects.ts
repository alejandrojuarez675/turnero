import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CalendarActions from '../actions/calendar.actions';
import * as ErrorActions from '../actions/error.actions';
import * as ReservaActions from '../actions/reserva.actions';
import { ServiceService } from '../../services/service.service';


@Injectable()
export class ReservaEffects {

    reservaTurno$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReservaActions.RESERVA_TURNO),
            mergeMap((payload: any) => this.reservaService.reservaTurno(payload.filter).pipe(
                map(profesionalesDisponibles =>
                    ({ type: CalendarActions.SET_PROFESIONALES_DISPONIBLES, profesionalesDisponibles })),
                catchError((error: Error) =>
                    of({ type: ErrorActions.SHOW_ERROR, error: error.message })
                )
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private reservaService: ServiceService,
    ) { }
}

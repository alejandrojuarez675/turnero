import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DisponibilidadDias } from '../../../shared/models/datos.models';
import { ServiceService } from '../../services/service.service';
import * as CalendarActions from '../actions/calendar.actions';

@Injectable()
export class CalendarEffects {

    getDiasDisponibles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CalendarActions.GET_DIAS_DISPONIBLES),
            mergeMap((payload: any) => this.service.busquedaDiasDisponibles(payload.filter).pipe(
                map((diasDisponibles) =>
                    ({ type: CalendarActions.SET_DIAS_DISPONIBLES, diasDisponibles })),
                catchError(() => EMPTY)
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private service: ServiceService,
    ) { }
}

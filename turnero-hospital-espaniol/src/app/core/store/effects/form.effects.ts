import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as FormActions from '../actions/form.actions';
import * as CalendarActions from '../actions/calendar.actions';
import { ServiceService } from './../../services/service.service';


@Injectable()
export class FormEffects {


    getObraSociales$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormActions.GET_OBRA_SOCIALES),
            mergeMap(() => this.formService.getObraSociales().pipe(
                map(obrasSociales => ({ type: FormActions.SET_OBRA_SOCIALES, obrasSociales })),
                catchError(() => EMPTY)
            ))
        )
    );

    getEspecialidades$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormActions.GET_ESPECIALIDADES),
            mergeMap(() => this.formService.getEspecialidades().pipe(
                map(especialidades => ({ type: FormActions.SET_ESPECIALIDADES, especialidades })),
                catchError(() => EMPTY)
            ))
        )
    );

    getCentrosDeAtencion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormActions.GET_CENTROS_DE_ATENCION),
            mergeMap(() => this.formService.getCentrosDeAtencion().pipe(
                map(centrosDeAtencion => ({ type: FormActions.SET_CENTROS_DE_ATENCION, centrosDeAtencion })),
                catchError(() => EMPTY)
            ))
        )
    );

    getBusquedaProfesionales$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormActions.GET_BUSQUEDA_PROFESIONALES),
            mergeMap((payload: any) => this.formService.getBusquedaProfesionales(payload.filter).pipe(
                map(profesionalesDisponibles =>
                    ({ type: CalendarActions.SET_PROFESIONALES_DISPONIBLES, profesionalesDisponibles })),
                catchError(() => EMPTY)
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private formService: ServiceService,
    ) { }
}

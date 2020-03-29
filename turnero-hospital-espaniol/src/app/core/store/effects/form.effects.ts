import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CalendarActions from '../actions/calendar.actions';
import * as ErrorActions from '../actions/error.actions';
import * as FormActions from '../actions/form.actions';
import { ServiceService } from './../../services/service.service';


@Injectable()
export class FormEffects {


    getObraSociales$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormActions.GET_OBRA_SOCIALES),
            mergeMap(() => this.formService.getObraSociales().pipe(
                map(obrasSociales => ({ type: FormActions.SET_OBRA_SOCIALES, obrasSociales })),
                catchError((error: Error) =>
                    of({ type: ErrorActions.SHOW_ERROR, error: error.message })
                )
            ))
        )
    );

    getEspecialidades$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormActions.GET_ESPECIALIDADES),
            mergeMap(() => this.formService.getEspecialidades().pipe(
                map(especialidades => ({ type: FormActions.SET_ESPECIALIDADES, especialidades })),
                catchError((error: Error) =>
                    of({ type: ErrorActions.SHOW_ERROR, error: error.message })
                )
            ))
        )
    );

    getCentrosDeAtencion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormActions.GET_CENTROS_DE_ATENCION),
            mergeMap(() => this.formService.getCentrosDeAtencion().pipe(
                map(centrosDeAtencion => ({ type: FormActions.SET_CENTROS_DE_ATENCION, centrosDeAtencion })),
                catchError((error: Error) =>
                    of({ type: ErrorActions.SHOW_ERROR, error: error.message })
                )
            ))
        )
    );

    getBusquedaProfesionales$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FormActions.GET_BUSQUEDA_PROFESIONALES),
            mergeMap((payload: any) => this.formService.busquedaProfesionales(payload.filter).pipe(
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
        private formService: ServiceService,
    ) { }
}

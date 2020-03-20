import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GET_OBRA_SOCIALES, SET_OBRA_SOCIALES, GET_ESPECIALIDADES, SET_ESPECIALIDADES, GET_CENTROS_DE_ATENCION, SET_CENTROS_DE_ATENCION } from '../actions/form.actions';
import { ServiceService } from './../../services/service.service';


@Injectable()
export class FormEffects {


    getObraSociales$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_OBRA_SOCIALES),
            mergeMap(() => this.formService.getObraSociales().pipe(
                map(obrasSociales => ({ type: SET_OBRA_SOCIALES, obrasSociales })),
                catchError(() => EMPTY)
            ))
        )
    );

    getEspecialidades$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_ESPECIALIDADES),
            mergeMap(() => this.formService.getEspecialidades().pipe(
                map(especialidades => ({ type: SET_ESPECIALIDADES, especialidades })),
                catchError(() => EMPTY)
            ))
        )
    );

    getCentrosDeAtencion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GET_CENTROS_DE_ATENCION),
            mergeMap(() => this.formService.getCentrosDeAtencion().pipe(
                map(centrosDeAtencion => ({ type: SET_CENTROS_DE_ATENCION, centrosDeAtencion })),
                catchError(() => EMPTY)
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private formService: ServiceService,
    ) { }
}

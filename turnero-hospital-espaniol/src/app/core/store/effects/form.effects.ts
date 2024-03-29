import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { GET_OBRA_SOCIALES, SET_OBRA_SOCIALES } from '../actions/form.actions';
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

    constructor(
        private actions$: Actions,
        private formService: ServiceService,
    ) { }
}

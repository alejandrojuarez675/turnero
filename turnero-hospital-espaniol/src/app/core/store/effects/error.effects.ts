import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { timer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as ErrorActions from '../actions/error.actions';


@Injectable()
export class ErrorEffects {

    showError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ErrorActions.SHOW_ERROR),
            mergeMap((payload: any) => timer(10000).pipe(
                map(() => ({ type: ErrorActions.CLEAN_ERROR, error: payload.error })))
            )
        )
    );

    constructor(
        private actions$: Actions,
    ) { }
}

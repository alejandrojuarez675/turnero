import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ServiceService } from '../../services/service.service';
import * as ContextActions from '../actions/contexto.actions';
import * as ErrorActions from '../actions/error.actions';

@Injectable()
export class ContextEffects {

    getToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContextActions.GET_TOKEN),
            switchMap((payload: any) => this.service.login(payload.login).pipe(
                map((token) =>
                        ({ type: ContextActions.SET_TOKEN, token: token })),
                catchError((error: Error) =>
                        of({ type: ErrorActions.SHOW_ERROR, error: error.message })
                )
            ))
        )
    );

    getUsuario$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ContextActions.GET_USUARIO),
            mergeMap((payload: any) => this.service.getInfoUsuario(payload.credencialUsuario).pipe(
                map(infoUsuario => ({ type: ContextActions.SET_USUARIO, infoUsuario })),
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

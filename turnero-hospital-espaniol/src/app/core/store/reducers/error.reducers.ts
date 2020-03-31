import { Action, createReducer, on } from '@ngrx/store';
import * as ErrorActions from '../actions/error.actions';
import { ErrorUtils } from './../../utils/error.utils';

export class Errors {
    errors: string[];
}

const initialState: Errors = {
    errors: []
};

const _showError = (state: Errors, error: string) => {
    const stateNew = {...state};
    stateNew.errors = [...state.errors, ErrorUtils.getFormatedError(error)];
    return stateNew;
};

const _cleanError = (state: Errors, error: string) => {
    const stateNew = {...state};
    stateNew.errors = state.errors.filter( x => x !== ErrorUtils.getFormatedError(error));
    return stateNew;
};

const _errorReducer = createReducer(
    initialState,

    on(ErrorActions.showError, (state, { error }) =>
        _showError(state, error)),

    on(ErrorActions.cleanError, (state, { error }) =>
        _cleanError(state, error)),
);

export function errorReducer(state: Errors, action: Action) {
    return _errorReducer(state, action);
}

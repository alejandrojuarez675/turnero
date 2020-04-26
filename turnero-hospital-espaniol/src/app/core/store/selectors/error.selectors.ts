import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Errors } from '../reducers/error.reducers';


export const selectError = createFeatureSelector<Errors>('error');

export const selectErrorMessages = createSelector(
    selectError,
    (error: Errors) => error.errors[error.errors.length - 1]
);

export const getCountError =  createSelector(
    selectError,
    (error: Errors) => error.errors.length
);
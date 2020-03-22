import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Calendario } from '../../../shared/models/datos.models';


export const selectFromStore = createFeatureSelector<Calendario>('calendario');

export const getProfesionalesDisponibles = createSelector(
    selectFromStore,
    (calendario: Calendario) => calendario.profesionalesDisponibles
);

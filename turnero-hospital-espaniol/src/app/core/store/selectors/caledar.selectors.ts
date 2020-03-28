import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Calendario } from '../../../shared/models/datos.models';


export const selectFromStore = createFeatureSelector<Calendario>('calendario');

export const getProfesionalesDisponibles = createSelector(
    selectFromStore,
    (calendario: Calendario) => calendario.profesionalesDisponibles
);

export const getProfesionalesDisponiblesLength = createSelector(
    selectFromStore,
    (calendario: Calendario) => calendario.profesionalesDisponibles.length
);

export const getDiasDisponibles = createSelector(
    selectFromStore,
    (calendario: Calendario) => calendario.diasDisponibles.filter(x => x.conDisponibilidad)
);

export const getDiasDisponiblesLength = createSelector(
    selectFromStore,
    (calendario: Calendario) => calendario.diasDisponibles.filter(x => x.conDisponibilidad).length
);

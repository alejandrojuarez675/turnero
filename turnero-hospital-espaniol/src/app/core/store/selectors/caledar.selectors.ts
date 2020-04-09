import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Calendario, Formulario, Profesional } from '../../../shared/models/datos.models';


export const selectCalendario = createFeatureSelector<Calendario>('calendario');
export const selectFormulario = createFeatureSelector<Formulario>('formulario');

export const getProfesionalesDisponibles = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.profesionalesDisponibles
);

export const getProfesionalesDisponiblesLength = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.profesionalesDisponibles.length
);

export const getProfesionalSelected = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.profesionalSelected
);

export const getDiasDisponibles = createSelector(
    [getProfesionalSelected, selectCalendario],
    (_profesionalSelected: Profesional, calendario: Calendario) =>
        calendario.diasDisponibles.filter(x => x.conDisponibilidad)
);

export const getDiasDisponiblesLength = createSelector(
    [getProfesionalSelected, selectCalendario],
    (_profesionalSelected: Profesional, calendario: Calendario) =>
        calendario.diasDisponibles.filter(x => x.conDisponibilidad).length
);

export const getTurnoSelected = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.turnoSelected
);

export const getFechaSelected = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.fechaSelected
);

export const getHorariosDisponibles = createSelector(
    [getFechaSelected, selectCalendario],
    (_fechaSelected: Date, calendario: Calendario) => calendario.horariosDisponibles
);

export const getHorariosDisponiblesLength = createSelector(
    [getFechaSelected, selectCalendario],
    (_fechaSelected: Date, calendario: Calendario) => calendario.horariosDisponibles.length
);

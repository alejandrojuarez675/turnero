import { createAction, props } from '@ngrx/store';
import { Disponibilidad, DisponibilidadDias, Turno } from '../../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest } from '../../../shared/models/request.models';

export const SET_PROFESIONALES_DISPONIBLES = '[API] - setProfesionalesDisponibles';
export const GET_DIAS_DISPONIBLES = '[Calendar] - getDiasDisponibles';
export const SET_DIAS_DISPONIBLES = '[API] - setDiasDisponibles';
export const SET_TURNO_SELECTED = '[Calendar] - setTurnoSelected';

export const setProfesionalesDisponibles = createAction(
    SET_PROFESIONALES_DISPONIBLES,
    props<{profesionalesDisponibles: Disponibilidad[]}>()
);

export const getDiasDisponibles = createAction(
    GET_DIAS_DISPONIBLES,
    props<{ filter: BusquedaDiasDisponiblesRequest }>()
);

export const setDiasDisponibles = createAction(
    SET_DIAS_DISPONIBLES,
    props<{ diasDisponibles: DisponibilidadDias[] }>()
);

export const setTurnoSelected = createAction(
    SET_TURNO_SELECTED,
    props<{ turnoSelected: Turno }>()
);

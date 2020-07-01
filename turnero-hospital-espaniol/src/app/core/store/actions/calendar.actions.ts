import { createAction, props } from '@ngrx/store';
import { Disponibilidad, DisponibilidadDias, Turno, ProfesionalEspecialidad } from '../../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest, BusquedaHorariosRequest } from '../../../shared/models/request.models';

export const CLEAN_STORE = '[Calendar] - cleanStore';
export const SET_PROFESIONALES_DISPONIBLES = '[Calendar] - setProfesionalesDisponibles';
export const GET_DIAS_DISPONIBLES = '[Calendar] - getDiasDisponibles';
export const SET_DIAS_DISPONIBLES = '[Calendar] - setDiasDisponibles';
export const SET_FILTROHORA_SELECTED = '[Calendar] - setFiltroHora';
export const SET_FILTROHORA2_SELECTED = '[Calendar] - setFiltroHora2';
export const SET_TURNO_SELECTED = '[Calendar] - setTurnoSelected';
export const SET_PROFESIONAL_SELECTED = '[Calendar] - setProfesionalSelected';
export const SET_FECHA_SELECTED = '[Calendar] - setFechaSelected';
export const GET_HORARIOS_DISPONIBLES = '[Calendar] - getHorariosDisponibles';
export const SET_HORARIOS_DISPONIBLES = '[Calendar] - setHorariosDisponibles';

export const cleanStore = createAction(CLEAN_STORE);

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

export const setFiltroHora = createAction(
    SET_FILTROHORA_SELECTED,
    props<{ filtroHora: string }>()
);

export const setFiltroHora2 = createAction(
    SET_FILTROHORA2_SELECTED,
    props<{ filtroHora2: string }>()
);

export const setProfesionalSelected = createAction(
    SET_PROFESIONAL_SELECTED,
    props<{ profesional: ProfesionalEspecialidad }>()
);

export const setFechaSelected = createAction(
    SET_FECHA_SELECTED,
    props<{ fecha: Date }>()
);

export const getHorariosDisponibles = createAction(
    GET_HORARIOS_DISPONIBLES,
    props<{ filter: BusquedaHorariosRequest }>()
);

export const setHorariosDisponibles = createAction(
    SET_HORARIOS_DISPONIBLES,
    props<{ horarios: Turno[]}>()
);

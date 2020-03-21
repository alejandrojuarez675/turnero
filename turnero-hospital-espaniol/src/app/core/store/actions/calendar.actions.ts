import { props, createAction } from '@ngrx/store';
import { Profesional } from '../../../shared/models/datos.models';

export const SET_PROFESIONALES_DISPONIBLES = '[Form API] - setProfesionalesDisponibles';

export const setProfesionalesDisponibles = createAction(
    SET_PROFESIONALES_DISPONIBLES,
    props<{profesionalesDisponibles: Profesional[]}>()
);

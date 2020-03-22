import { createAction, props } from '@ngrx/store';
import { Disponibilidad } from '../../../shared/models/datos.models';

export const SET_PROFESIONALES_DISPONIBLES = '[Form API] - setProfesionalesDisponibles';

export const setProfesionalesDisponibles = createAction(
    SET_PROFESIONALES_DISPONIBLES,
    props<{profesionalesDisponibles: Disponibilidad[]}>()
);

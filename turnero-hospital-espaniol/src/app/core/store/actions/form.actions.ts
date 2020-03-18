import { createAction, props } from '@ngrx/store';
import { ObraSocial } from '../../../shared/models/datos.models';

export const GET_OBRA_SOCIALES = '[Form] - getObraSociales';
export const SET_OBRA_SOCIALES = '[Form API] - setObraSociales ';

export const getObraSociales = createAction(GET_OBRA_SOCIALES);

export const setObraSociales = createAction(
    SET_OBRA_SOCIALES,
    props<{ obrasSociales: ObraSocial[] }>()
);

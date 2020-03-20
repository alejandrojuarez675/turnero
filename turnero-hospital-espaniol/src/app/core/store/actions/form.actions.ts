import { createAction, props } from '@ngrx/store';
import { ObraSocial, Plan } from '../../../shared/models/datos.models';

export const GET_OBRA_SOCIALES = '[Form] - getObraSociales';
export const SET_OBRA_SOCIALES = '[Form API] - setObraSociales ';
export const SET_OBRA_SOCIAL_SELECTED = '[Form] - setObraSocialSelected ';
export const SET_PLAN_SELECTED = '[Form] - setPlanSelected ';

export const getObraSociales = createAction(GET_OBRA_SOCIALES);

export const setObraSociales = createAction(
    SET_OBRA_SOCIALES,
    props<{ obrasSociales: ObraSocial[] }>()
);

export const setObraSocialSelected = createAction(
    SET_OBRA_SOCIAL_SELECTED,
    props<{obraSocialSelected: ObraSocial}>()
);

export const setPlanSelected = createAction(
    SET_OBRA_SOCIAL_SELECTED,
    props<{planSelected: Plan}>()
);

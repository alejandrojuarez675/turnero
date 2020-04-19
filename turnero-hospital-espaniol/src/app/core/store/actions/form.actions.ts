import { createAction, props } from '@ngrx/store';
import { ObraSocial, Plan, Especialidad, CentroAtencion, Profesional } from '../../../shared/models/datos.models';
import { BusquedaProfesionalesRequest } from '../../../shared/models/request.models';

export const GET_OBRA_SOCIALES = '[Form] - getObraSociales';
export const GET_ESPECIALIDADES = '[Form] - getEspecialidades';
export const GET_CENTROS_DE_ATENCION = '[Form] - getCentrosDeAtencion';

export const SET_OBRA_SOCIALES = '[API] - setObraSociales ';
export const SET_ESPECIALIDADES = '[API] - setEspecialidades';
export const SET_CENTROS_DE_ATENCION = '[API] - setCentrosDeAtencion';

export const SET_FECHA_NACIMIENTO = '[Form] - setFechaNacimiento ';
export const SET_OBRA_SOCIAL_SELECTED = '[Form] - setObraSocialSelected ';
export const SET_PLAN_SELECTED = '[Form] - setPlanSelected ';
export const SET_ESPECIALIDAD_SELECTED = '[Form] - setEspecialidadSelected ';
export const SET_CENTRO_DE_ATENCION_SELECTED = '[Form] - setCentroDeAtencionSelected ';

export const GET_BUSQUEDA_PROFESIONALES = '[Form] - getBusquedaProfesionales ';



export const getObraSociales = createAction(GET_OBRA_SOCIALES);
export const getEspecialidades = createAction(GET_ESPECIALIDADES);
export const getCentrosDeAtencion = createAction(GET_CENTROS_DE_ATENCION);

export const setObraSociales = createAction(
    SET_OBRA_SOCIALES,
    props<{ obrasSociales: ObraSocial[] }>()
);

export const setEspecialidades = createAction(
    SET_ESPECIALIDADES,
    props<{ especialidades: Especialidad[] }>()
);

export const setCentrosDeAtencion = createAction(
    SET_CENTROS_DE_ATENCION,
    props<{ centrosDeAtencion: CentroAtencion[] }>()
);

export const setFechaNacimiento = createAction(
    SET_FECHA_NACIMIENTO,
    props<{fechaNacimiento: Date}>()
);

export const setObraSocialSelected = createAction(
    SET_OBRA_SOCIAL_SELECTED,
    props<{obraSocialSelected: ObraSocial}>()
);

export const setPlanSelected = createAction(
    SET_PLAN_SELECTED,
    props<{planSelected: Plan}>()
);

export const setEspecialidadSelected = createAction(
    SET_ESPECIALIDAD_SELECTED,
    props<{especialidadSelected: Especialidad}>()
);

export const setCentroDeAtencionSelected = createAction(
    SET_CENTRO_DE_ATENCION_SELECTED,
    props<{centroDeAtencionSelected: CentroAtencion}>()
);

export const getBusquedaProfesionales = createAction(
    GET_BUSQUEDA_PROFESIONALES,
    props<{filter: BusquedaProfesionalesRequest}>()
);

import { createReducer, on } from '@ngrx/store';
import { CentroAtencion, Especialidad, Formulario, ObraSocial, Plan } from '../../../shared/models/datos.models';
import * as FormActions from '../actions/form.actions';


export const initialState: 
Formulario = {
    obrasSociales: [],
    especialidades: [],
    centrosDeAtencion: [],
    fechaNacimiento: undefined,
    obraSocialSelected: undefined,
    planSelected: undefined,
    especialidadSelected: undefined,
    centroDeAtencionSelected: undefined,
};

const _setObraSociales = (state: Formulario, obraSociales: ObraSocial[]): Formulario => {
    const stateNew = { ...state };
    stateNew.obrasSociales = obraSociales;
    return stateNew;
};

const _setObraSocialSelected = (state: Formulario, obraSocialSelected: ObraSocial): Formulario => {
    const stateNew = { ...state };
    stateNew.obraSocialSelected = obraSocialSelected;
    stateNew.planSelected = undefined;
    return stateNew;
};

const _setPlanSelected = (state: Formulario, planSelected: Plan): Formulario => {
    const stateNew = { ...state };
    stateNew.planSelected = planSelected;
    return stateNew;
};

const _setFechaNacimiento = (state: Formulario, fechaNacimiento: Date) => {
    const stateNew = { ...state };
    stateNew.fechaNacimiento = fechaNacimiento;
    return stateNew;
};

const _setEspecialidades = (state: Formulario, especialidades: Especialidad[]) => {
    const stateNew = { ...state };
    stateNew.especialidades = especialidades;
    return stateNew;
};

const _setCentrosDeAtencion = (state: Formulario, centrosDeAtencion: CentroAtencion[]) => {
    const stateNew = { ...state };
    stateNew.centrosDeAtencion = centrosDeAtencion;
    return stateNew;
};

const _setEspecialidadSelected = (state: Formulario, especialidadSelected: Especialidad) => {
    const stateNew = { ...state };
    stateNew.especialidadSelected = especialidadSelected;
    return stateNew;
};

const _setCentroDeAtencionSelected = (state: Formulario, centroDeAtencionSelected: CentroAtencion) => {
    const stateNew = { ...state };
    stateNew.centroDeAtencionSelected = centroDeAtencionSelected;
    return stateNew;
};

const _formReducer = createReducer(initialState,

    on(FormActions.setObraSociales, (state, { obrasSociales }) =>
        _setObraSociales(state, obrasSociales)),

    on(FormActions.setEspecialidades, (state, { especialidades }) =>
        _setEspecialidades(state, especialidades)),

    on(FormActions.setCentrosDeAtencion, (state, { centrosDeAtencion }) =>
        _setCentrosDeAtencion(state, centrosDeAtencion)),

    on(FormActions.setFechaNacimiento, (state, { fechaNacimiento }) =>
        _setFechaNacimiento(state, fechaNacimiento)),

    on(FormActions.setObraSocialSelected, (state, { obraSocialSelected }) =>
        _setObraSocialSelected(state, obraSocialSelected)),

    on(FormActions.setPlanSelected, (state, { planSelected }) =>
        _setPlanSelected(state, planSelected)),

    on(FormActions.setEspecialidadSelected, (state, { especialidadSelected }) =>
        _setEspecialidadSelected(state, especialidadSelected)),

    on(FormActions.setCentroDeAtencionSelected, (state, { centroDeAtencionSelected }) =>
        _setCentroDeAtencionSelected(state, centroDeAtencionSelected)),

);

export function formReducer(state, action) {
    return _formReducer(state, action);
}

import { createReducer, on } from '@ngrx/store';
import { Formulario, ObraSocial, Plan } from '../../../shared/models/datos.models';
import { getObraSociales, setObraSociales, setObraSocialSelected, setPlanSelected } from '../actions/form.actions';


export const initialState: Formulario = {
    obrasSociales: [],
    obraSocialSelected: undefined,
    planSelected: undefined,
};

const _setObraSociales = (state: Formulario, obraSociales: ObraSocial[]): Formulario => {
    const stateNew = {...state};
    stateNew.obrasSociales = obraSociales;
    return stateNew;
};

const _setObraSocialSelected = (state: Formulario, obraSocialSelected: ObraSocial): Formulario => {
    const stateNew = {...state};
    stateNew.obraSocialSelected = obraSocialSelected;
    return stateNew;
};

const _setPlanSelected = (state: Formulario, planSelected: Plan): Formulario => {
    const stateNew = {...state};
    stateNew.planSelected = planSelected;
    return stateNew;
};

const _formReducer = createReducer(initialState,
    on(getObraSociales, state => state),
    on(setObraSociales, (state, {obrasSociales}) => _setObraSociales(state, obrasSociales)),
    on(setObraSocialSelected, (state, {obraSocialSelected}) => _setObraSocialSelected(state, obraSocialSelected)),
    on(setPlanSelected, (state, {planSelected}) => _setPlanSelected(state, planSelected)),
);

export function formReducer(state, action) {
    return _formReducer(state, action);
}

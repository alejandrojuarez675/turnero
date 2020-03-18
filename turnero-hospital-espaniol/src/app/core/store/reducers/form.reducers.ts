import { createReducer, on } from '@ngrx/store';
import { Formulario, ObraSocial } from '../../../shared/models/datos.models';
import { getObraSociales, setObraSociales } from '../actions/form.actions';


export const initialState: Formulario = {
    obrasSociales: [],
};

const setObrasSociales = (state: Formulario, obraSociales: ObraSocial[]): Formulario => {
    const stateNew = {...state};
    stateNew.obrasSociales = obraSociales;
    return stateNew;
};

const _formReducer = createReducer(initialState,
    on(getObraSociales, state => state),
    on(setObraSociales, (state, {obrasSociales}) => setObrasSociales(state, obrasSociales)),
);

export function formReducer(state, action) {
    return _formReducer(state, action);
}

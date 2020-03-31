import { createReducer, on } from '@ngrx/store';
import { ReservaFormulario, Turno } from '../../../shared/models/datos.models';
import * as ReservaActions from '../actions/reserva.actions';

const initialState: ReservaFormulario = {
    paciente: undefined,
    turnoSelected: undefined,


    dni: undefined,
    mail: undefined,
    telefono: undefined,
    nombreApellido: undefined,
    sexo: undefined
};



const _setTurnoSelected = (state: ReservaFormulario, turnoSelected: Turno) => {
    const stateNew = {...state};
    stateNew.turnoSelected = turnoSelected;
    return stateNew;
};

const _reservaReducer = createReducer(
    initialState,

    on(ReservaActions.setTurnoSelected, (state, { turnoSelected }) =>
        _setTurnoSelected(state, turnoSelected)),

);

export function reservaReducer(state, action) {
    return _reservaReducer(state, action);
}

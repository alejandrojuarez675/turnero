import { createReducer, on } from '@ngrx/store';
import { Paciente, Reserva, ReservaFormulario, Turno } from '../../../shared/models/datos.models';
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

const _setPaciente = (state: ReservaFormulario, paciente: Paciente) => {
    const stateNew = { ...state };
    stateNew.paciente = paciente;
    return stateNew;
};

const _reservaReducer = createReducer(
    initialState,

    on(ReservaActions.cleanStore, () => initialState),

    on(ReservaActions.setTurnoSelected, (state, { turnoSelected }) =>
        _setTurnoSelected(state, turnoSelected)),

    on(ReservaActions.setPaciente, (state, { paciente }) =>
       _setPaciente(state, paciente)),

    on(ReservaActions.setTurno, (state, {turno}) => 
        _setTurnoSelected(state, turno)),

);

export function reservaReducer(state, action) {
    return _reservaReducer(state, action);
}

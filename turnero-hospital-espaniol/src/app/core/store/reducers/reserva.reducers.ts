import { createReducer, on } from '@ngrx/store';
import { ReservaFormulario, Turno, Paciente, Reserva } from '../../../shared/models/datos.models';
import * as ReservaActions from '../actions/reserva.actions';
import { ReservaTurnoRequest } from '../../../shared/models/request.models';
import { reservarTurno } from '../selectors/reserva.selectors';

const initialState: ReservaFormulario = {
    paciente: undefined,
    turnoSelected: undefined,
    reserva: undefined,

    dni: undefined,
    mail: undefined,
    telefono: undefined,
    nombreApellido: undefined,
    sexo: undefined
};

const _setTurnoSelected = (state: ReservaFormulario, turnoSelected: Turno) => {
    const stateNew = {...state};
    console.log("Entra al setTurnoSelected " + turnoSelected);
    stateNew.turnoSelected = turnoSelected;
    return stateNew;
};

const _setReserva = (state: ReservaFormulario, reservaSelected: Reserva) => {
    const stateNew = {...state};
    console.log("Entra y llega al set Reserva con " + reservaSelected);
    stateNew.reserva = new Reserva();
    stateNew.reserva.codigoReserva = reservaSelected.codigoReserva;
    stateNew.reserva.vencimientoReserva = reservaSelected.vencimientoReserva;
    return stateNew;
};

const _setPaciente = (state: ReservaFormulario, paciente: Paciente) => {
    const stateNew = { ...state };
    stateNew.paciente = paciente;
    return stateNew;
};

const _reservaReducer = createReducer(
    initialState,

    on(ReservaActions.setTurnoSelected, (state, { turnoSelected }) =>
        _setTurnoSelected(state, turnoSelected)),

    on(ReservaActions.setReservaSelected, (state, { reservaSelected }) =>
        _setReserva(state, reservaSelected)),

    on(ReservaActions.setPaciente, (state, { paciente }) =>
       _setPaciente(state, paciente)),
);

export function reservaReducer(state, action) {
    return _reservaReducer(state, action);
}

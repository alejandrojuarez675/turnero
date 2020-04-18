import { createReducer, on } from '@ngrx/store';
import { Reserva } from '../../../shared/models/datos.models';
import * as ReservacionActions from '../actions/reservacion.actions';

const initialState: Reserva = {
    codigo: undefined,
    vencimiento: undefined,
};

const _setReserva = (state: Reserva, reserva: Reserva) => {
    const stateNew = {...state};
    stateNew.codigo = reserva.codigo;
    stateNew.vencimiento = reserva.vencimiento;
    return stateNew;
};


const _reservacionReducer = createReducer(
    initialState,

    on(ReservacionActions.cleanStore, () => initialState),

    on(ReservacionActions.setReservaSelected, (state, {reserva}) =>
        _setReserva(state, reserva)),

);

export function reservacionReducer(state, action) {
    return _reservacionReducer(state, action);
}

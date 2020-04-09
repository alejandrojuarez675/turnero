import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReservaFormulario, Paciente, Reserva } from '../../../shared/models/datos.models';
import { ReservaTurnoRequest } from '../../../shared/models/request.models';

export const selectFormulario = createFeatureSelector<ReservaFormulario>('reserva');
export const selectReserva = createFeatureSelector<Reserva>('reserva');

export const reservarTurno = createSelector(
    selectFormulario,
    (filter: ReservaFormulario) => {
        const request = new ReservaTurnoRequest();
        request.paciente = filter.paciente;
        request.codigoTurno = filter.turnoSelected.codigo;
        return request;
    }
);

export const getReservaSelected = createSelector(
    selectFormulario,
    (reserva: ReservaFormulario) => reserva
);

export const getReserva =  createSelector(
    selectFormulario,
    (reservaSelected: ReservaFormulario) => {
        if (reservaSelected.reserva !== undefined) {
        }
        return reservaSelected;
    }
);

export const getTurnoSelected = createSelector(
    selectFormulario,
    (reserva: ReservaFormulario) => reserva.turnoSelected
);


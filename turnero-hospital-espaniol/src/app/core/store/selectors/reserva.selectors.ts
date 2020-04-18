import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Reserva, ReservaFormulario } from '../../../shared/models/datos.models';
import { ReservaTurnoRequest } from '../../../shared/models/request.models';

export const selectFormulario = createFeatureSelector<ReservaFormulario>('reserva');
export const selectReserva = createFeatureSelector<Reserva>('reserva');

export const reservarTurno = createSelector(
    selectFormulario,
    (filter: ReservaFormulario) => {
        if (!filter || !filter.turnoSelected) { return; }
        const request = new ReservaTurnoRequest();
        request.paciente = filter.paciente;
        request.codigoTurno = filter.turnoSelected.codigo;
        return request;
    }
);

export const getReserva =  createSelector(
    selectFormulario,
    (reservaSelected: ReservaFormulario) => {
        return reservaSelected;
    }
);

export const getTurnoSelected = createSelector(
    selectFormulario,
    (reserva: ReservaFormulario) => reserva.turnoSelected
);


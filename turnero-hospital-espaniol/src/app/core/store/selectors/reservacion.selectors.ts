import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Reserva, ReservaFormulario } from '../../../shared/models/datos.models';
import { ReservaTurnoRequest } from '../../../shared/models/request.models';

export const selectReserva = createFeatureSelector<Reserva>('reservacion');

export const getReserva =  createSelector(
    selectReserva,
    (reserva: Reserva) => {
        return reserva;
    }
);


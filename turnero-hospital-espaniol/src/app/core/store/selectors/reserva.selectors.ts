import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReservaFormulario, Paciente, Reserva } from "../../../shared/models/datos.models";
import { ReservaTurnoRequest } from "../../../shared/models/request.models";

export const selectFormulario = createFeatureSelector<ReservaFormulario>('reserva');
export const selectReserva = createFeatureSelector<Reserva>('reserva');

export const reservarTurno = createSelector(
    selectFormulario,
    (filter: ReservaFormulario) => {
        const request = new ReservaTurnoRequest();
        request.paciente = filter.paciente;
        request.codigoTurno = filter.turnoSelected.codigo;
        console.log("LLEGA " + request.codigoTurno);
        console.log(filter.paciente);
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
        console.log("ESTA ENTRANDO AL SELECTOR DE GET RESERVA con valor " +reservaSelected.reserva);
        if (reservaSelected.reserva !== undefined) {

            console.log("CODIGO DE RESERVA " +reservaSelected.reserva.codigoReserva);
        }
        return reservaSelected;
    }
);

export const getTurnoSelected = createSelector(
    selectFormulario,
    (reserva: ReservaFormulario) => reserva.turnoSelected
);


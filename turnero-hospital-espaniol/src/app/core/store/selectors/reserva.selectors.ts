import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReservaFormulario, Paciente, Reserva } from "../../../shared/models/datos.models";
import { ReservaTurnoRequest } from "../../../shared/models/request.models";

export const selectFormulario = createFeatureSelector<ReservaFormulario>('reserva');
export const selectReserva = createFeatureSelector<Reserva>('reserva');

export const reservarTurno = createSelector(
    selectFormulario,
    (filter: ReservaFormulario) => {
        const request = new ReservaTurnoRequest();
        const paciente = new Paciente();
        // paciente.dni = 3120261;
        // paciente.nombreApellido = 'Fernando Javier';
        // paciente.sexo = 'MASCULINO';
        // paciente.telefono = '3416877404';
        // paciente.mail = 'a@a.com';
        console.log("LLEGA " + filter);
        console.log(filter.paciente);
        console.log(filter.nombreApellido);
        console.log(filter.dni);
        request.paciente = paciente;
        return request;
    }
);

export const getReservaSelected = createSelector(
    selectFormulario,
    (reserva: ReservaFormulario) => reserva
);

export const getReserva =  createSelector(
    selectReserva,
    (reservaSelected: Reserva) => reservaSelected
);


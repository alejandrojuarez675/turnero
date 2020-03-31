import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReservaFormulario, Paciente } from "../../../shared/models/datos.models";
import { ReservaTurnoRequest } from "../../../shared/models/request.models";

export const selectFormulario = createFeatureSelector<ReservaFormulario>('formulario');

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


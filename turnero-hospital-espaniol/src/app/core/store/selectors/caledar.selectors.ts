import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Calendario, Formulario, Profesional, ProfesionalEspecialidad } from '../../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest, BusquedaHorariosRequest } from '../../../shared/models/request.models';
import { DateUtils } from '../../utils/date.utils';


export const selectCalendario = createFeatureSelector<Calendario>('calendario');
export const selectFormulario = createFeatureSelector<Formulario>('formulario');

export const getProfesionalesDisponibles = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.profesionalesDisponibles
);

export const getProfesionalesDisponiblesLength = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.profesionalesDisponibles.length
);

export const getProfesionalSelected = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.profesionalSelected
);

export const getDiasTurnosDisponibles = createSelector(
    [getProfesionalSelected, selectCalendario],
    (_profesionalSelected: ProfesionalEspecialidad, calendario: Calendario) =>
        calendario.diasDisponibles.filter(x => x.conDisponibilidad)
);

export const getDiasDisponibles = createSelector(
    [getProfesionalSelected, selectCalendario],
    (_profesionalSelected: ProfesionalEspecialidad, calendario: Calendario) =>
        calendario.diasDisponibles
);

export const getDiasDisponiblesLength = createSelector(
    [getProfesionalSelected, selectCalendario],
    (_profesionalSelected: ProfesionalEspecialidad, calendario: Calendario) =>
        calendario.diasDisponibles.length
);

export const getBusquedaDiasDisponiblesRequest = createSelector(
    [getProfesionalSelected, selectFormulario],
    (profesionalSelected: ProfesionalEspecialidad, formulario: Formulario) => {
        const request = new BusquedaDiasDisponiblesRequest();
        request.fechaNacimiento = formulario.fechaNacimiento;
        request.codigoObraSocial = formulario.obraSocialSelected.codigo;
        request.codigoPlan = formulario.planSelected.codigo;
        if (formulario.especialidadSelected != undefined) {
            request.codigoEspecialidad = formulario.especialidadSelected.codigo;
        }
        request.codigoCentroAtencion = formulario.centroDeAtencionSelected.codigo;
        if (profesionalSelected != undefined) {
            request.codigoProfesional = profesionalSelected.codigo;
        }
        return request;
    }
);

export const getTurnoSelected = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.turnoSelected
);

export const getFechaSelected = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.fechaSelected
);

export const getBusquedaHorariosRequest = createSelector(
    [getProfesionalSelected, getFechaSelected, selectFormulario],
    (profesionalSelected: ProfesionalEspecialidad, fechaSelected: Date, formulario: Formulario) => {
        const request = new BusquedaHorariosRequest();
        request.fechaNacimiento = formulario.fechaNacimiento;
        request.codigoObraSocial = formulario.obraSocialSelected.codigo;
        request.codigoPlan = formulario.planSelected.codigo;
        request.codigoEspecialidad = formulario.especialidadSelected.codigo;
        request.codigoCentroAtencion = formulario.centroDeAtencionSelected.codigo;
        if (profesionalSelected != undefined) {
            request.codigoProfesional = profesionalSelected.codigo;
        }
        request.fecha = fechaSelected;
        return request;
    }
);

export const getHorariosDisponibles = createSelector(
    [getFechaSelected, selectCalendario],
    (_fechaSelected: Date, calendario: Calendario) => calendario.horariosDisponibles
);

export const getHorariosDisponiblesLength = createSelector(
    [getFechaSelected, selectCalendario],
    (_fechaSelected: Date, calendario: Calendario) => calendario.horariosDisponibles.length
);

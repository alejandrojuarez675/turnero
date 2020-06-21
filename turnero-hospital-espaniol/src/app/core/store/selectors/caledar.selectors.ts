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

export const getFiltroHora =  createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.filtroHora
);

export const getDiasTurnosDisponibles = createSelector(
    [getProfesionalSelected, selectCalendario],
    
    (_profesionalSelected: ProfesionalEspecialidad, calendario: Calendario) =>
        calendario.diasDisponibles.filter(x => (
            (calendario.filtroHora == undefined || 
                    (calendario.filtroHora != 'AM' && calendario.filtroHora != 'PM')
                ) && (x.conDisponibilidadTM || x.conDisponibilidadTT)
            ) ||
            (calendario.filtroHora === 'AM' && x.conDisponibilidadTM) ||
            (calendario.filtroHora === 'PM' && x.conDisponibilidadTT)
        )
);

export const getDiasDisponibles = createSelector(
    [getProfesionalSelected, selectCalendario],
    (_profesionalSelected: ProfesionalEspecialidad, calendario: Calendario) =>
    calendario.diasDisponibles.filter(x => (
        (calendario.filtroHora == undefined || 
                (calendario.filtroHora != 'AM' && calendario.filtroHora != 'PM')
            ) && (x.conDisponibilidadTM || x.conDisponibilidadTT)
        ) ||
        (calendario.filtroHora === 'AM' && x.conDisponibilidadTM) ||
        (calendario.filtroHora === 'PM' && x.conDisponibilidadTT)
    )
);

export const getDiasDisponiblesLength = createSelector(
    [getProfesionalSelected, selectCalendario],
    (_profesionalSelected: ProfesionalEspecialidad, calendario: Calendario) =>
        calendario.diasDisponibles.filter(x => (
            (calendario.filtroHora == undefined || 
                    (calendario.filtroHora != 'AM' && calendario.filtroHora != 'PM')
                ) && (x.conDisponibilidadTM || x.conDisponibilidadTT)
            ) ||
            (calendario.filtroHora === 'AM' && x.conDisponibilidadTM) ||
            (calendario.filtroHora === 'PM' && x.conDisponibilidadTT)
        ).length
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
            request.codigoEspecialidad = profesionalSelected.especialidad.codigo;
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
        if (formulario.especialidadSelected != undefined) {
            request.codigoEspecialidad = formulario.especialidadSelected.codigo;
        } 
        request.codigoCentroAtencion = formulario.centroDeAtencionSelected.codigo;
        if (profesionalSelected != undefined) {
            request.codigoProfesional = profesionalSelected.codigo;
            request.codigoEspecialidad = profesionalSelected.especialidad.codigo;
        }
        request.fecha = fechaSelected;
        return request;
    }
);

export const getHorariosDisponibles = createSelector(
    [getFechaSelected, selectCalendario],
    (_fechaSelected: Date, calendario: Calendario) => {
        return calendario.horariosDisponibles.filter(x => (
            (calendario.filtroHora == undefined || 
                (calendario.filtroHora != 'AM' && calendario.filtroHora != 'PM')
            )
            ||
            (calendario.filtroHora === 'AM' && x.hora.indexOf('a.m.') >= 0) 
            ||
            (calendario.filtroHora === 'PM' && x.hora.indexOf('p.m.') >= 0)
        ))
    }
);

export const getHorariosDisponiblesLength = createSelector(
    [getFechaSelected, selectCalendario],
    (_fechaSelected: Date, calendario: Calendario) => {
        return calendario.horariosDisponibles.filter(x => (
            (calendario.filtroHora == undefined || 
                (calendario.filtroHora != 'AM' && calendario.filtroHora != 'PM')
            )
            ||
            (calendario.filtroHora === 'AM' && x.hora.indexOf('a.m.') >= 0) 
            ||
            (calendario.filtroHora === 'PM' && x.hora.indexOf('p.m.') >= 0)
        )).length
    }
);

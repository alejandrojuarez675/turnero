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

export const getFiltroHora2 =  createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.filtroHora2
);

export const getDiasTurnosDisponibles = createSelector(
    [getProfesionalSelected, selectCalendario],
    
    (_profesionalSelected: ProfesionalEspecialidad, calendario: Calendario) =>
        calendario.diasDisponibles.filter(x => (
            (calendario.filtroHora2 == undefined || 
                    (calendario.filtroHora2 != 'AM' && calendario.filtroHora2 != 'PM')
                ) && (x.conDisponibilidadTM || x.conDisponibilidadTT)
            ) ||
            (calendario.filtroHora2 === 'AM' && x.conDisponibilidadTM) ||
            (calendario.filtroHora2 === 'PM' && x.conDisponibilidadTT)
        )
);

export const getDiasDisponibles = createSelector(
    [getProfesionalSelected, selectCalendario],
    (_profesionalSelected: ProfesionalEspecialidad, calendario: Calendario) =>
    calendario.diasDisponibles.filter(x => (
        (calendario.filtroHora2 == undefined || 
                (calendario.filtroHora2 != 'AM' && calendario.filtroHora2 != 'PM')
            ) && (x.conDisponibilidadTM || x.conDisponibilidadTT)
        ) ||
        (calendario.filtroHora2 === 'AM' && x.conDisponibilidadTM) ||
        (calendario.filtroHora2 === 'PM' && x.conDisponibilidadTT)
    )
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
        if (formulario.planSelected  != undefined) {
            request.codigoPlan = formulario.planSelected.codigo;
        }
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
        if (formulario.planSelected  != undefined) {
            request.codigoPlan = formulario.planSelected.codigo;
        }
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
//        return calendario.horariosDisponibles
        return calendario.horariosDisponibles.filter(x => (
            (calendario.filtroHora2 == undefined || 
                (calendario.filtroHora2 != 'AM' && calendario.filtroHora2 != 'PM')
            )
            ||
            (calendario.filtroHora2 === 'AM' && x.hora.indexOf('a.m.') >= 0) 
            ||
            (calendario.filtroHora2 === 'PM' && x.hora.indexOf('p.m.') >= 0)
        ))
    }
);

export const getHorariosDisponiblesLength = createSelector(
    [getFechaSelected, selectCalendario],
    (_fechaSelected: Date, calendario: Calendario) => {
//        return calendario.horariosDisponibles.length
        return calendario.horariosDisponibles.filter(x => (
            (calendario.filtroHora2 == undefined || 
                (calendario.filtroHora2 != 'AM' && calendario.filtroHora2 != 'PM')
            )
            ||
            (calendario.filtroHora2 === 'AM' && x.hora.indexOf('a.m.') >= 0) 
            ||
            (calendario.filtroHora2 === 'PM' && x.hora.indexOf('p.m.') >= 0)
        )).length
    }
);

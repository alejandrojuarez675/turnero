import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Calendario, Formulario } from '../../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest } from '../../../shared/models/request.models';
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

export const getDiasDisponibles = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.diasDisponibles.filter(x => x.conDisponibilidad)
);

export const getDiasDisponiblesLength = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.diasDisponibles.filter(x => x.conDisponibilidad).length
);

export const getBusquedaDiasDisponiblesRequest = createSelector(
    selectFormulario,
    (formulario: Formulario) => {
        const request = new BusquedaDiasDisponiblesRequest();
        request.fechaNacimiento = formulario.fechaNacimiento;
        request.codigoObraSocial = formulario.obraSocialSelected.codigo;
        request.codigoPlan = formulario.planSelected.codigo;
        request.codigoEspecialidad = formulario.especialidadSelected.codigo;
        request.codigoCentroAtencion = formulario.centroDeAtencionSelected.codigo;
        return request;
    }
);

export const getTurnoSelected = createSelector(
    selectCalendario,
    (calendario: Calendario) => calendario.turnoSelected
);

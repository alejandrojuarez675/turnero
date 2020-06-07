import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Formulario, ObraSocial, Profesional } from '../../../shared/models/datos.models';
import { BusquedaProfesionalesRequest, DatosFormulario } from '../../../shared/models/request.models';
import { DateUtils } from '../../utils/date.utils';
import { setEspecialidadSelected, getEspecialidades } from '../actions/form.actions';

export const selectFormulario = createFeatureSelector<Formulario>('formulario');

export const selectAllObrasSociales = createSelector(
    selectFormulario,
    (formulario: Formulario) => formulario.obrasSociales
);

export const selectAllProfesionales = createSelector(
    selectFormulario,
    (formulario: Formulario) => {
        if (formulario.especialidadSelected != undefined && formulario.especialidadSelected.codigo != undefined) {
            return formulario.profesionales.filter(x => 
                x.especialidad.filter(esp => esp.codigo === formulario.especialidadSelected.codigo).length>0
            );
        }
        return formulario.profesionales;
    }
);

export const selectAllEspecialidades = createSelector(
    selectFormulario,
    (formulario: Formulario) => formulario.especialidades
);

export const selectAllCentrosDeAtencion = createSelector(
    selectFormulario,
    (formulario: Formulario) => formulario.centrosDeAtencion
);

export const selectObraSocialSelected = createSelector(
    selectFormulario,
    (formulario: Formulario) => formulario.obraSocialSelected
);

export const selectPlanes = createSelector(
    selectObraSocialSelected,
    (obraSocial: ObraSocial) => {
        if (obraSocial) {
            return obraSocial.plan;
        }
    }
);

export const selectPlanSelected = createSelector(
    selectFormulario,
    (formulario: Formulario) => formulario.planSelected
);

export const selectEspecialidad = createSelector(
    selectFormulario,
    (formulario: Formulario) => formulario.especialidadSelected
);

export const selectFechaNacimiento = createSelector(
    selectFormulario,
    (formulario: Formulario) => formulario.fechaNacimiento
);

export const selectBusquedaProfesionales = createSelector(
    selectFormulario,
    (formulario: Formulario) => {
        const request = new BusquedaProfesionalesRequest();
        request.fechaNacimiento = formulario.fechaNacimiento;
        request.codigoObraSocial = formulario.obraSocialSelected.codigo;
        request.codigoPlan = formulario.planSelected.codigo;
        if (formulario.especialidadSelected != undefined) {
            request.codigoEspecialidad = formulario.especialidadSelected.codigo;
        }
        request.codigoCentroAtencion = formulario.centroDeAtencionSelected.codigo;
        request.profesional = formulario.profesionalSelected;
        if (request.profesional === undefined || 
            request.profesional.nombreApellido === undefined) {
            request.profesional = new Profesional();
        }
        return request;
    }
);

export const selectDatosFormulario = createSelector(
    selectFormulario,
    (formulario: Formulario) => {
        const datos = new DatosFormulario();
        datos.fechaNacimiento = formulario.fechaNacimiento;
        datos.obraSocial = formulario.obraSocialSelected;
        datos.plan = formulario.planSelected;
        datos.especialidad = formulario.especialidadSelected;
        datos.centroAtencion = formulario.centroDeAtencionSelected;
        datos.profesional = new Profesional();
        return datos;
    }
);

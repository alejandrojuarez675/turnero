import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Formulario, ObraSocial } from '../../../shared/models/datos.models';
import { BusquedaProfesionalesRequest } from '../../../shared/models/request.models';

export const selectFormulario = createFeatureSelector<Formulario>('formulario');

export const selectAllObrasSociales = createSelector(
    selectFormulario,
    (formulario: Formulario) => formulario.obrasSociales
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
        request.codigoEspecialidad = formulario.especialidadSelected.codigo;
        request.codigoCentroAtencion = formulario.centroDeAtencionSelected.codigo;
        return request;
    }
);
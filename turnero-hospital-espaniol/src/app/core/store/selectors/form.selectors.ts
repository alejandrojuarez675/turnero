import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Formulario, ObraSocial } from '../../../shared/models/datos.models';

export const selectFormulario = createFeatureSelector<Formulario>('formulario');

export const selectAllObrasSociales = createSelector(
    selectFormulario,
    (formulario: Formulario) => formulario.obrasSociales
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

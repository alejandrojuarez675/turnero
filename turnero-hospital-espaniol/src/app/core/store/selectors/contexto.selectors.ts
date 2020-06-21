import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Contexto } from '../../../shared/models/datos.models';
import { BusquedaProfesionalesRequest } from '../../../shared/models/request.models';
import { DateUtils } from '../../utils/date.utils';

export const selectContexto = createFeatureSelector<Contexto>('contexto');

export const getToken =  createSelector(
    selectContexto,
    (contexto: Contexto) => {
        return contexto.token;
    }
);

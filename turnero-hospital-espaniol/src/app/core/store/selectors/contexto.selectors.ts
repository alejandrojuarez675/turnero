import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Contexto } from '../../../shared/models/datos.models';

export const selectContexto = createFeatureSelector<Contexto>('contexto');

export const getToken =  createSelector(
    selectContexto,
    (contexto: Contexto) => {
        return contexto.token;
    }
);

export const getEsAnonimo =  createSelector(
    selectContexto,
    (contexto: Contexto) => {
        return contexto.esAnonimo;
    }
);


export const getInfoUsuario =  createSelector(
    selectContexto,
    (contexto: Contexto) => {
        return contexto.infoUsuario;
    }
);

export const getNickname =  createSelector(
    selectContexto,
    (contexto: Contexto) => {
        if (!contexto || !contexto.infoUsuario) { return undefined; }
        return contexto.infoUsuario.usuarioPaciente;
    }
);

export const getPacientes =  createSelector(
    selectContexto,
    (contexto: Contexto) => {
        if (!contexto || !contexto.infoUsuario) { return []; }
        return contexto.infoUsuario.pacientes;
    }
);

export const getPacienteSelected =  createSelector(
    selectContexto,
    (contexto: Contexto) => {
        return contexto.pacienteSelected;
    }
);
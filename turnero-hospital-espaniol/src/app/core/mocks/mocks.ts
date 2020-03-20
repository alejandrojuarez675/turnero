import { ObraSocial, Plan, CentroAtencion, Especialidad } from '../../shared/models/datos.models';

export const planMock1: Plan = {
    codigo: '210',
    nombre: '210 - Básico'
};

export const planMock2: Plan = {
    codigo: '310',
    nombre: '310 - Básico'
};

export const planMock3: Plan = {
    codigo: '410',
    nombre: '410 - Básico'
};

export const obraSocialMock1: ObraSocial = {
    codigo: 'OSDE',
    nombre: 'OSDE',
    plan: [
        planMock1, planMock2, planMock3
    ]
};

export const obraSocialMock2: ObraSocial = {
    codigo: 'ACA Salud',
    nombre: 'ACA Salud',
    plan: [
        planMock1, planMock2, planMock3
    ]
};

export const obrasSocialesMocks: ObraSocial[] = [obraSocialMock1, obraSocialMock2];

export const especialidadesMocks: Especialidad[] = [
    {
        codigo: 'KIN',
        nombre: 'Kinesiología'
    },
    {
        codigo: 'END',
        nombre: 'Endocrinología'
    }
];


export const centroAtencionMock: CentroAtencion = {
    codigo: 'HE',
    nombre: 'Hospital Español'
};

export const centroAtencionesMocks: CentroAtencion[] = [centroAtencionMock];


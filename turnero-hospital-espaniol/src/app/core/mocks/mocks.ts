import { ObraSocial, Plan, CentroAtencion, Especialidad, Profesional, Disponibilidad } from '../../shared/models/datos.models';

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

export const planMock4: Plan = {
    codigo: '510',
    nombre: '510 - Básico'
};

export const obraSocialMock1: ObraSocial = {
    codigo: 'OSDE',
    nombre: 'OSDE',
    plan: [
        planMock1, planMock2
    ]
};

export const obraSocialMock2: ObraSocial = {
    codigo: 'ACA Salud',
    nombre: 'ACA Salud',
    plan: [
        planMock3, planMock4
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

const profesional1: Profesional = {
    codigo: 'PeJu',
    nombreApellido: 'Perez, Juan',
    observaciones: '',
};

const disponibilidad: Disponibilidad = {
    profesional: profesional1,
    turnoManiana: {
        profesional: profesional1,
        especialidad: especialidadesMocks[0],
        codigo: '148',
        centroAtencion: centroAtencionMock,
        fecha: '15/03/2020',
        hora: '10:00',
        observaciones: ''
    },
    turnoTarde: {
        profesional: profesional1,
        especialidad: especialidadesMocks[0],
        codigo: '348',
        centroAtencion: centroAtencionMock,
        fecha: '25/03/2020',
        hora: '20:15',
        observaciones: ''
    }
};

export const profesionalesMocks: Disponibilidad[] = [
    disponibilidad, disponibilidad
];

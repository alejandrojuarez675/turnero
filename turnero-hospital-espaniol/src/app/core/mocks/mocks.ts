import { ObraSocial, Plan } from '../../shared/models/datos.models';


export const planMock: Plan = {
    codigo: '210',
    nombre: '210 - Básico'
};

export const obraSocialMock: ObraSocial = {
    codigo: 'OSDE',
    nombre: 'OSDE',
    plan: [
        planMock, planMock, planMock
    ]
};


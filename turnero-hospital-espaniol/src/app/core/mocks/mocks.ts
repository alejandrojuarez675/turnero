// tslint:disable-next-line: max-line-length
import { CentroAtencion, Disponibilidad, DisponibilidadDias, Especialidad, ObraSocial, Plan, Profesional, TurnoLight, Turno, Reserva, ProfesionalEspecialidad } from '../../shared/models/datos.models';
import { DateUtils } from '../utils/date.utils';

export const planMock1: Plan = {
    codigo: 1,
    nombre: '210 - Básico'
};

export const planMock2: Plan = {
    codigo: 2,
    nombre: '310 - Básico'
};

export const planMock3: Plan = {
    codigo: 3,
    nombre: '410 - Básico'
};

export const planMock4: Plan = {
    codigo: 4,
    nombre: '510 - Básico'
};

export const obraSocialMock1: ObraSocial = {
    codigo: 123,
    nombre: 'OSDE',
    plan: [
        planMock1, planMock2
    ]
};

export const obraSocialMock2: ObraSocial = {
    codigo: 12345,
    nombre: 'ACA Salud',
    plan: [
        planMock3, planMock4
    ]
};

export const obrasSocialesMocks: ObraSocial[] = [obraSocialMock1, obraSocialMock2];

export const especialidadesMocks: Especialidad[] = [
    {
        codigo: 1,
        nombre: 'Kinesiología'
    },
    {
        codigo: 2,
        nombre: 'Endocrinología'
    }
];


export const centroAtencionMock: CentroAtencion = {
    codigo: 1,
    nombre: 'Hospital Español'
};

export const centroAtencionesMocks: CentroAtencion[] = [centroAtencionMock];

const profesional1: Profesional = {
    nombreApellido: 'Perez, Juan',
    especialidad: especialidadesMocks,
    codigoProfesion: 1,
    matriculaProfesional: "123"
};

const profesional2: Profesional = {
    nombreApellido: 'Riquelme, Roman',
    especialidad: especialidadesMocks,
    codigoProfesion: 1,
    matriculaProfesional: "456",
};

const profesionalE1: ProfesionalEspecialidad = {
    codigo: 1,
    nombreApellido: 'Perez, Juan',
    observaciones: '',
    observacionesResumido: '',
    especialidad: especialidadesMocks[0],
};

const profesionalE2: ProfesionalEspecialidad = {
    codigo: 2,
    nombreApellido: 'Riquelme, Roman',
    observaciones: 'Solo particular - $10',
    observacionesResumido: 'Solo particular',
    especialidad: especialidadesMocks[0],
};

const turno1: TurnoLight = {
    codigo: 148,
    centroAtencion: centroAtencionMock,
    fecha: new Date('2020/03/28'),
    hora: '10:00',
    observaciones: '',
    observacionesResumido: ''
};

const turno2: TurnoLight = {
    codigo: 348,
    centroAtencion: centroAtencionMock,
    fecha: new Date('2020/03/26'),
    hora: '20:15',
    observaciones: 'Solo particular - $10',
    observacionesResumido: 'Solo particular',
};

const turno5: TurnoLight = {
    codigo: 148,
    centroAtencion: centroAtencionMock,
    fecha: new Date('2020/03/28'),
    hora: '10:00 a.m.',
    observaciones: '',
    observacionesResumido: ''
};

const turno6: TurnoLight = {
    codigo: 348,
    centroAtencion: centroAtencionMock,
    fecha: new Date('2020/03/26'),
    hora: '08:15 p.m.',
    observaciones: 'Solo particular - $10',
    observacionesResumido: 'Solo particular',
};

const turno3: TurnoLight = {
    codigo: 548,
    centroAtencion: centroAtencionMock,
    fecha: new Date('2020/03/29'),
    hora: '10:00',
    observaciones: 'Solo particular - $10',
    observacionesResumido: 'Solo particular',
};

const turno4: TurnoLight = {
    codigo: 648,
    centroAtencion: centroAtencionMock,
    fecha: new Date('2020/04/4'),
    hora: '20:15',
    observaciones: '',
    observacionesResumido: ''
};

const disponibilidad: Disponibilidad = {
    profesional: profesionalE1,
    turnoManiana: turno1,
    turnoTarde: turno2,
    turno: turno1
};

const disponibilidad2: Disponibilidad = {
    profesional: profesionalE2,
    turnoManiana: turno3,
    turnoTarde: turno4,
    turno: turno3
};

export const profesionalesDisponibilidadMocks: Disponibilidad[] = [
    disponibilidad, disponibilidad2,
    disponibilidad, disponibilidad2,
    disponibilidad, disponibilidad2,
    disponibilidad, disponibilidad2,
];

export const profesionalesMocks: Profesional[] = [
    profesional1, profesional2,
];


const diasDisponibles = () => {
    const response: DisponibilidadDias[] = [];
    DateUtils.getDaysArray(new Date(), 9).forEach(
        (day: Date, index: number) => {
            response.push({
                fecha: '2020-07-0' + index,
                conDisponibilidadTM: index % 2 === 0,
                conDisponibilidadTT: index % 3 === 0
            });
        }
    );
    return response;
};

export const diasDisponiblesMock = diasDisponibles();

export const horariosMock: Turno[] = [
    {
        ...turno1,
        profesional: profesionalE1,
    }, {
        ...turno2,
        profesional: profesionalE1,
    }
];

export const horariosMock2: Turno[] = [
    {
        ...turno5,
        profesional: profesionalE1,
    }, {
        ...turno6,
        profesional: profesionalE1,
    }
];

export const reservaTurnoMock: Reserva = {
    codigo: 123,
    vencimiento: new Date('2020/03/30')
};

export const turnoMock: Turno = {
    ...turno1,
    profesional: profesionalE1,
};

// tslint:disable-next-line: max-line-length
export const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6IlNPUE9SVEVJVCIsIlNlc3Npb25JZCI6IjExYTEzYTljLTc3NmQtNGM3Ni05YjUwLThjZDM0YWIwZThiNCIsImV4cCI6MTU4NzkwMDMxOSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNzMvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNzMvIn0.n5SJmebQ5BzAwRrWt0JCDoD5qW7rVr7aXVGcGJSk7eY';

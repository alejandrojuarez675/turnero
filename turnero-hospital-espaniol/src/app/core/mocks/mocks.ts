// tslint:disable-next-line: max-line-length
import { CentroAtencion, Disponibilidad, DisponibilidadDias, Especialidad, ObraSocial, Plan, Profesional, TurnoLight, Turno, Reserva } from '../../shared/models/datos.models';
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
    codigo: 'HE',
    nombre: 'Hospital Español'
};

export const centroAtencionesMocks: CentroAtencion[] = [centroAtencionMock];

const profesional1: Profesional = {
    codigo: 'PeJu',
    nombreApellido: 'Perez, Juan',
    observaciones: '',
};

const turno1: TurnoLight = {
    codigo: 148,
    centroAtencion: centroAtencionMock,
    fecha: new Date('2020/03/28'),
    hora: '10:00',
    observaciones: ''
};

const turno2: TurnoLight = {
    codigo: 348,
    centroAtencion: centroAtencionMock,
    fecha: new Date('2020/03/30'),
    hora: '20:15',
    observaciones: ''
};

const disponibilidad: Disponibilidad = {
    profesional: profesional1,
    especialidad: especialidadesMocks[0],
    turnoManiana: turno1,
    turnoTarde: turno2
};

export const profesionalesMocks: Disponibilidad[] = [
    disponibilidad, disponibilidad
];


const diasDisponibles = () => {
    const response: DisponibilidadDias[] = [];
    DateUtils.getDaysArray(new Date(), 15).forEach(
        (day: Date, index: number) => {
            response.push({
                fecha: day,
                conDisponibilidad: index % 2 === 0
            });
        }
    );
    return response;
};

export const diasDisponiblesMock = diasDisponibles();

export const horariosMock: Turno[] = [
    {
        ...turno1,
        profesional: profesional1,
        especialidad: especialidadesMocks[0]
    }, {
        ...turno2,
        profesional: profesional1,
        especialidad: especialidadesMocks[0]
    }
];

export const reservaTurnoMock: Reserva = {
    codigoReserva: 123,
    vencimientoReserva: new Date('2020/03/30')
};

export const turnoMock : Turno = {
    ...turno1,
    profesional: profesional1,
    especialidad: especialidadesMocks[0]
}

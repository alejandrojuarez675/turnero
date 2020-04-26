import { DisponibilidadDiasStore } from '../../../../shared/models/datos.models';

const colors: any = {
    blue: {
        primary: '#00000000', // lo hacemos coincidir con el fondo del recuadro
        secondary: '#00000000'
    },
    yellow: {
        primary: '#00000000',
        secondary: '#00000000'
    },
};

export const disponibilidadDiasToCalendarEvent = (dia: DisponibilidadDiasStore) => {
    if (dia.conDisponibilidad) {
        return {
            start: dia.fecha,
            title: '',
            color: colors.blue,
            meta: {
                incrementsBadgeTotal: false,
            },
        };
    } else {
        return {
            start: dia.fecha,
            title: '',
            color: colors.yellow,
            meta: {
                incrementsBadgeTotal: false,
            },
        };
    }
};

export const toMonthString = (month: number) => {
    let result = '';

    switch (month) {
        case 0:
            result = 'enero';
            break;
        case 1:
            result = 'febrero';
            break;
        case 2:
            result = 'marzo';
            break;
        case 3:
            result = 'abril';
            break;
        case 4:
            result = 'mayo';
            break;
        case 5:
            result = 'junio';
            break;
        case 6:
            result = 'julio';
            break;
        case 7:
            result = 'agosto';
            break;
        case 8:
            result = 'septiembre';
            break;
        case 9:
            result = 'octubre';
            break;
        case 10:
            result = 'noviembre';
            break;
        case 11:
            result = 'diciembre';
            break;
    }
    result = result.toUpperCase();
    return result;
};

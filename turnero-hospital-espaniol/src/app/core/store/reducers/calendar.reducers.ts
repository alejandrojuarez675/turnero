import { createReducer, on } from '@ngrx/store';
import { Calendario, DisponibilidadDias } from '../../../shared/models/datos.models';
import * as CalendarActions from '../actions/calendar.actions';
import { DateUtils } from '../../utils/date.utils';

const initialState: Calendario = {
    profesionalesDisponibles: [],
    profesionalSelected: undefined,
    turnoSelected: undefined,
    diasDisponibles: [],
};


const _setProfesionalesDisponibles = (state: Calendario, profesionalesDisponibles) => {
    const stateNew = {...state};
    stateNew.profesionalesDisponibles = [...profesionalesDisponibles];
    return stateNew;
};

const _setDiasDisponibles = (state: Calendario, diasDisponibles: DisponibilidadDias[]) => {
    const stateNew = {...state};
    stateNew.diasDisponibles = [...diasDisponibles.map(x => { return {
        fecha: DateUtils.getDate(x.fecha),
        conDisponibilidad: x.conDisponibilidad
    }; })];
    return stateNew;
};

const _calendarReducer = createReducer(
    initialState,

    on(CalendarActions.setProfesionalesDisponibles, (state, { profesionalesDisponibles }) =>
        _setProfesionalesDisponibles(state, profesionalesDisponibles)),

    on(CalendarActions.setDiasDisponibles, (state, { diasDisponibles }) =>
        _setDiasDisponibles(state, diasDisponibles)),

);

export function calendarReducer(state, action) {
    return _calendarReducer(state, action);
}

import { createReducer, on } from '@ngrx/store';
import { Calendario, DisponibilidadDias, TurnoLight, Turno } from '../../../shared/models/datos.models';
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
    if (!diasDisponibles) { return state; }
    const stateNew = {...state};
    stateNew.diasDisponibles = [...diasDisponibles.map(x => { return {
        fecha: x.fecha,
        conDisponibilidad: x.conDisponibilidad
    }; })];
    return stateNew;
};

const _setTurnoSelected = (state: Calendario, turnoSelected: Turno) => {
    const stateNew = {...state};
    stateNew.turnoSelected = turnoSelected;
    return stateNew;
};

const _calendarReducer = createReducer(
    initialState,

    on(CalendarActions.setProfesionalesDisponibles, (state, { profesionalesDisponibles }) =>
        _setProfesionalesDisponibles(state, profesionalesDisponibles)),

    on(CalendarActions.setDiasDisponibles, (state, { diasDisponibles }) =>
        _setDiasDisponibles(state, diasDisponibles)),

    on(CalendarActions.setTurnoSelected, (state, { turnoSelected }) =>
        _setTurnoSelected(state, turnoSelected)),

);

export function calendarReducer(state, action) {
    return _calendarReducer(state, action);
}

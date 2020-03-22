import { createReducer, on } from '@ngrx/store';
import { Calendario } from '../../../shared/models/datos.models';
import * as CalendarActions from '../actions/calendar.actions';

const initialState: Calendario = {
    profesionalesDisponibles: []
};


const _setProfesionalesDisponibles = (state, profesionalesDisponibles) => {
    const stateNew = {...state};
    stateNew.profesionalesDisponibles = [...profesionalesDisponibles];
    return stateNew;
};

const _calendarReducer = createReducer(
    initialState,

    on(CalendarActions.setProfesionalesDisponibles, (state, { profesionalesDisponibles }) =>
        _setProfesionalesDisponibles(state, profesionalesDisponibles)),

);

export function calendarReducer(state, action) {
    return _calendarReducer(state, action);
}

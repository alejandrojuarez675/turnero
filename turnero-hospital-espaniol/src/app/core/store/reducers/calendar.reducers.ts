import { createReducer, on } from '@ngrx/store';
import { Calendario, DisponibilidadDias, Profesional, Turno, ProfesionalEspecialidad } from '../../../shared/models/datos.models';
import * as CalendarActions from '../actions/calendar.actions';

const initialState: Calendario = {
    filtroHora: undefined,
    profesionalesDisponibles: [],
    profesionalSelected: undefined,
    turnoSelected: undefined,
    diasDisponibles: [],
    fechaSelected: undefined,
    horariosDisponibles: [],
};


const _setProfesionalesDisponibles = (state: Calendario, profesionalesDisponibles) => {
    const stateNew = {...state};
    stateNew.profesionalesDisponibles = [...profesionalesDisponibles];
    return stateNew;
};

const _setDiasDisponibles = (state: Calendario, diasDisponibles: DisponibilidadDias[]) => {
    if (!diasDisponibles) { return state; }
    const stateNew = {...state};
    stateNew.diasDisponibles = [...diasDisponibles.map(x => {
        return {
            fecha: new Date(
                Number(x.fecha.split(/[- T :]/)[0]),
                Number(x.fecha.split(/[- T :]/)[1])-1,
                Number(x.fecha.split(/[- T :]/)[2]),
                0,0,0),
            conDisponibilidadTM: x.conDisponibilidadTM,
            conDisponibilidadTT: x.conDisponibilidadTT
        };
    })];
    return stateNew;
};

const _setTurnoSelected = (state: Calendario, turnoSelected: Turno) => {
    const stateNew = {...state};
    stateNew.turnoSelected = turnoSelected;
    return stateNew;
};

const _setFiltroHora = (state: Calendario, filtroHora: string) => {
    const stateNew = {...state};
    stateNew.filtroHora = filtroHora;
    return stateNew;
};

const _setProfesionalSelected = (state: Calendario, profesional: ProfesionalEspecialidad) => {
    const stateNew = {...state};
    stateNew.profesionalSelected = profesional;
    return stateNew;
};

const _setFechaSelected = (state: Calendario, fecha: Date) => {
    const stateNew = {...state};
    stateNew.fechaSelected = fecha;
    return stateNew;
};

const _setHorariosDisponibles = (state: Calendario, horarios: Turno[] ) => {
    const stateNew = {...state};
    stateNew.horariosDisponibles = horarios;
    return stateNew;
};

const _calendarReducer = createReducer(
    initialState,

    on(CalendarActions.cleanStore, () => initialState),

    on(CalendarActions.setProfesionalesDisponibles, (state, { profesionalesDisponibles }) =>
        _setProfesionalesDisponibles(state, profesionalesDisponibles)),

    on(CalendarActions.setDiasDisponibles, (state, { diasDisponibles }) =>
        _setDiasDisponibles(state, diasDisponibles)),

    on(CalendarActions.setTurnoSelected, (state, { turnoSelected }) =>
        _setTurnoSelected(state, turnoSelected)),

    on(CalendarActions.setFiltroHora, (state, { filtroHora }) =>
        _setFiltroHora(state, filtroHora)),

    on(CalendarActions.setProfesionalSelected, (state, { profesional }) =>
        _setProfesionalSelected(state, profesional)),

    on(CalendarActions.setFechaSelected, (state, { fecha }) =>
        _setFechaSelected(state, fecha )),

    on(CalendarActions.setHorariosDisponibles, (state, { horarios }) =>
        _setHorariosDisponibles(state, horarios )),
);

export function calendarReducer(state, action) {
    return _calendarReducer(state, action);
}

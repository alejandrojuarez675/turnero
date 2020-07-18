import { Paciente, ObraSocial, Plan, Especialidad, CentroAtencion, Profesional } from "./datos.models";

export class DatosFormulario {
    fechaNacimiento: Date;
    obraSocial: ObraSocial;
    plan: Plan;
    especialidad: Especialidad;
    profesional: Profesional;
    centroAtencion: CentroAtencion;
}

export class BusquedaRequest {
    fechaNacimiento: Date;
}

export class BusquedaProfesionalesRequest {
    fechaNacimiento: Date;
    codigoObraSocial: number;
    codigoPlan: number;
    codigoEspecialidad: number;
    codigoCentroAtencion: number;
    profesional: Profesional;
}

export class BusquedaDiasDisponiblesRequest
    extends BusquedaProfesionalesRequest {
    codigoProfesional: number;
}

export class BusquedaHorariosRequest
    extends BusquedaDiasDisponiblesRequest {
    fecha: Date;
}

export class ReservaTurnoRequest {
    codigoTurno: number;
    paciente: Paciente;
}

export class ConfirmacionTurnoRequest {
    codigoReserva: number;
    codigoTurno: number;
}


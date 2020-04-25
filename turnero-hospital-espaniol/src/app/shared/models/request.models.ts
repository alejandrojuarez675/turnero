import { Paciente } from "./datos.models";

export class BusquedaProfesionalesRequest {
    fechaNacimiento: Date;
    codigoObraSocial: number;
    codigoPlan: number;
    codigoEspecialidad: number;
    codigoCentroAtencion: number;
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
}


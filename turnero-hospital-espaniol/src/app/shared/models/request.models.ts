import { Paciente } from "./datos.models";

export class BusquedaProfesionalesRequest {
    fechaNacimiento: string;
    codigoObraSocial: number;
    codigoPlan: number;
    codigoEspecialidad: number;
    codigoCentroAtencion: string;
}

export class BusquedaDiasDisponiblesRequest
    extends BusquedaProfesionalesRequest {
    codigoProfesional: string;
}

export class BusquedaHorariosRequest
    extends BusquedaDiasDisponiblesRequest {
    fecha: Date;
}

export class ReservaTurnoRequest {
    codigoTurno: number;
    paciente: Paciente;
}


export class BusquedaProfesionalesRequest {
    fechaNacimiento: Date;
    codigoObraSocial: string;
    codigoPlan: string;
    codigoEspecialidad: string;
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


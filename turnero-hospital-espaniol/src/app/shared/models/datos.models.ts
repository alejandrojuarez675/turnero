export class CodigoNombre {
    codigo: string;
    nombre: string;
}

export class ObraSocial extends CodigoNombre {
    plan: Plan[];
}

export class Plan extends CodigoNombre {
}

export class Especialidad extends CodigoNombre {
}

export class CentroAtencion extends CodigoNombre {
}

export class Profesional {
    codigo: string;
    nombreApellido: string;
    observaciones: string;
}

export class Disponibilidad {
    profesional: Profesional;
    turnoManiana: Turno;
    turnoTarde: Turno;
}

export class Turno {
    codigo: string;
    centroAtencion: CentroAtencion;
    fecha: string;
    hora: string;
    observaciones: string;
    profesional: Profesional;
    especialidad: Especialidad;
}

export class DisponibilidadDias {
    fecha: string;
    conDisponibilidad: boolean;
}

export class Reserva {
    codigoReserva: string;
    vencimientoReserva: string;
}

export class Formulario {
    obrasSociales: ObraSocial[];
    especialidades: Especialidad[];
    centrosDeAtencion: CentroAtencion[];
    fechaNacimiento: Date;
    obraSocialSelected: ObraSocial;
    planSelected: Plan;
    especialidadSelected: Especialidad;
    centroDeAtencionSelected: CentroAtencion;
}

export class Calendario {
    profesionalesDisponibles: Disponibilidad[];
}

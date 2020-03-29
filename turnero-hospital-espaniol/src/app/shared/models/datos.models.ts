export class CodigoNombre {
    codigo: number;
    nombre: string;
}

export class RespuestaDTO {
    codigo: number;
    mensaje: string;
}


export class Respuesta {
    respuesta: RespuestaDTO;
}

export class ObraSocialRespuesta extends Respuesta {
    obraSocial: ObraSocial[];
}


export class ObraSocial extends CodigoNombre {
    plan: Plan[];
}

export class Plan extends CodigoNombre {
}

export class Especialidad extends CodigoNombre {
}

export class EspecialidadRespuesta extends Respuesta {
    especialidad: Especialidad[];
}

export class CentroAtencion {
    codigo: string;
    nombre: string;
}

export class CentroAtencionRespuesta extends Respuesta {
    centroAtencion: CentroAtencion[];
}

export class Profesional {
    codigo: string;
    nombreApellido: string;
    observaciones: string;
}

export class Disponibilidad {
    profesional: Profesional;
    especialidad: Especialidad;
    turnoManiana: TurnoLight;
    turnoTarde: TurnoLight;
}

export class TurnoLight {
    codigo: string;
    centroAtencion: CentroAtencion;
    fecha: Date;
    hora: string;
    observaciones: string;
}


export class DisponibilidadRespuesta extends Respuesta {
    disponibilidad: Disponibilidad[];
}

export class Turno extends TurnoLight {
    profesional: Profesional;
    especialidad: Especialidad;
}

export class DisponibilidadDias {
    fecha: string;
    conDisponibilidad: boolean;
}

export class DisponibilidadDiasRespuesta extends Respuesta {
    dia: DisponibilidadDias[];
}

export class DisponibilidadDiasStore {
    fecha: Date;
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
    profesionalSelected: Profesional;
    turnoSelected: Turno;
    diasDisponibles: DisponibilidadDiasStore[];
}

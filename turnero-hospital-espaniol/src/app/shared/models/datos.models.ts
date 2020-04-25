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
    codigo: number;
    nombre: string;
}

export class CentroAtencionRespuesta extends Respuesta {
    centroAtencion: CentroAtencion[];
}

export class Profesional {
    codigo: number;
    nombreApellido: string;
    observaciones: string;
    especialidad: Especialidad;
}

export class Disponibilidad {
    profesional: Profesional;
    turnoManiana: TurnoLight;
    turnoTarde: TurnoLight;
}

export class TurnoLight {
    codigo: number;
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
}

export class DisponibilidadDias {
    fecha: String;
    conDisponibilidad: boolean;
}

export class DisponibilidadDiasRespuesta extends Respuesta {
    dia: DisponibilidadDias[];
}

export class HorariosRespuesta extends Respuesta {
    turno: Turno[];
}

export class DisponibilidadDiasStore {
    fecha: Date;
    conDisponibilidad: boolean;
}

export class Reserva {
    codigo: number;
    vencimiento: Date;
}

export class ReservaRespuesta extends Respuesta {
    reserva: Reserva;
}

export class TurnoRespuesta extends Respuesta {
    turno: Turno;
}

export class Contexto {
    estado: number;
    token: string;
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
    fechaSelected: Date;
    horariosDisponibles: Turno[];
}

export class ReservaFormulario {
    turnoSelected: Turno;
    paciente: Paciente;
}

export class Paciente {
    dni: number;
    sexo: string;
    nombreApellido: string;
    telefono: string;
    email: string;
    fechaNacimiento: Date;
    codigoObraSocial: number;
    codigoPlan: number;
    codigoProfesional: number;
    codigoEspecialidad: number;
}

export class DatosReserva {
    paciente: Paciente;
    reserva: Reserva;
}

export class Login {
    username: string;
    password: string;
}

export class loginRespuesta {
    username: string;
    token: string;
    expires: Date;
}
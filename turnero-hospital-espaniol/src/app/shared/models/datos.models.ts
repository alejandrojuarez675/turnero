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

export class ProfesionalRespuesta extends Respuesta {
    profesionales: Profesional[];
}

export class CentroAtencion {
    codigo: number;
    nombre: string;
}

export class CentroAtencionRespuesta extends Respuesta {
    centroAtencion: CentroAtencion[];
}

export class Profesional {
    codigoProfesion: number;
    matriculaProfesional: string;
    nombreApellido: string;
    especialidad: Especialidad[];
}

export class ProfesionalEspecialidad {
    nombreApellido: string;
    especialidad: Especialidad;
    codigo: number;
    observaciones: string;
    observacionesIntermedio: string
    observacionesResumido: string;
}

export class Disponibilidad {
    profesional: ProfesionalEspecialidad;
    turnoManiana: TurnoLight;
    turnoTarde: TurnoLight;
    turno: TurnoLight;
}

export class TurnoLight {
    codigo: number;
    centroAtencion: CentroAtencion;
    fecha: Date;
    hora: string;
    observaciones: string;
    observacionesIntermedio: string
    observacionesResumido: string;
}


export class DisponibilidadRespuesta extends Respuesta {
    disponibilidad: Disponibilidad[];
}

export class Turno extends TurnoLight {
    profesional: ProfesionalEspecialidad;
}

export class DisponibilidadDias {
    fecha: String;
    conDisponibilidadTM: boolean;
    conDisponibilidadTT: boolean;
}

export class DisponibilidadDiasRespuesta extends Respuesta {
    dia: DisponibilidadDias[];
}

export class HorariosRespuesta extends Respuesta {
    turno: Turno[];
}

export class DisponibilidadDiasStore {
    fecha: Date;
    conDisponibilidadTM: boolean;
    conDisponibilidadTT: boolean;
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
    token: string;
}

export class Formulario {
    obrasSociales: ObraSocial[];
    especialidades: Especialidad[];
    profesionales: Profesional[];
    centrosDeAtencion: CentroAtencion[];
    fechaNacimiento: Date;
    obraSocialSelected: ObraSocial;
    planSelected: Plan;
    profesionalSelected: Profesional;
    especialidadSelected: Especialidad;
    centroDeAtencionSelected: CentroAtencion;
}

export class Calendario {
    filtroHora: string;
    filtroHora2: string;
    profesionalesDisponibles: Disponibilidad[];
    profesionalSelected: ProfesionalEspecialidad;
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
    telefono: Telefono;
    email: string;
    fechaNacimiento: Date;
    codigoObraSocial: number;
    codigoPlan: number;
    codigoProfesional: number;
    codigoEspecialidad: number;
}

export class Telefono {
    area: string;
    numero: string;
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
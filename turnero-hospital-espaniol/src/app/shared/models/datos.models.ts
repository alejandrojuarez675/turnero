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

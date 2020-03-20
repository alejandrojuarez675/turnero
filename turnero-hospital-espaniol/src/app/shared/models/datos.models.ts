export class CodigoNombre {
    codigo: string;
    nombre: string;
}

export class ObraSocial extends CodigoNombre {
    plan: Plan[];
}

export class Plan extends CodigoNombre {
}

export class Formulario {
    obrasSociales: ObraSocial[];
    obraSocialSelected: ObraSocial;
}

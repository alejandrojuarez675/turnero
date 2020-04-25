package com.sanatorio.espanol.backend.dto;

public class Disponibilidad {

	public Profesional profesional;
	public TurnoManiana turnoManiana;
	public TurnoTarde turnoTarde;
	
	
	public Disponibilidad(
			Profesional profesional, TurnoManiana turnoManiana,TurnoTarde turnoTarde) {
		super();
		this.profesional = profesional;
		this.turnoManiana = turnoManiana;
		this.turnoTarde = turnoTarde;
	}
	
	
}

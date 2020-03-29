package com.sanatorio.espanol.backend.dto;

public class Disponibilidad {

	public Profesional profesional;
	public Especialidad especialidad;
	public TurnoManiana turnoManiana;
	public TurnoTarde turnoTarde;
	
	
	public Disponibilidad(
			Profesional profesional, Especialidad especialidad, 
			TurnoManiana turnoManiana,TurnoTarde turnoTarde) {
		super();
		this.profesional = profesional;
		this.especialidad = especialidad;
		this.turnoManiana = turnoManiana;
		this.turnoTarde = turnoTarde;
	}
	
	
}

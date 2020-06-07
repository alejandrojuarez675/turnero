package com.sanatorio.espanol.backend.dto;

public class Disponibilidad {

	public ProfesionalEspecialidad profesional;
	public TurnoManiana turnoManiana;
	public TurnoTarde turnoTarde;
	
	
	public Disponibilidad(
			ProfesionalEspecialidad profesional, TurnoManiana turnoManiana,TurnoTarde turnoTarde) {
		super();
		this.profesional = profesional;
		this.turnoManiana = turnoManiana;
		this.turnoTarde = turnoTarde;
	}
	
	
}

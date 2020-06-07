package com.sanatorio.espanol.backend.dto;

import java.util.List;

public class Profesional {

	public String nombreApellido;
	public String matriculaProfesional;
	public Integer codigoProfesion;
	
	public List<Especialidad> especialidad;

	public Profesional() {
		super();
	}
	
	public Profesional(String nombreApellido, String matriculaProfesional, Integer codigoProfesion, 
			List<Especialidad> especialidad) {
		super();
		this.nombreApellido = nombreApellido;
		this.matriculaProfesional = matriculaProfesional;
		this.codigoProfesion = codigoProfesion;
		this.especialidad = especialidad;
	}

	public String getNombreApellido() {
		return nombreApellido;
	}

	public String getMatriculaProfesional() {
		return matriculaProfesional;
	}

	public Integer getCodigoProfesion() {
		return codigoProfesion;
	}

	public List<Especialidad> getEspecialidad() {
		return especialidad;
	}

	public void setNombreApellido(String nombreApellido) {
		this.nombreApellido = nombreApellido;
	}

	public void setMatriculaProfesional(String matriculaProfesional) {
		this.matriculaProfesional = matriculaProfesional;
	}

	public void setCodigoProfesion(Integer codigoProfesion) {
		this.codigoProfesion = codigoProfesion;
	}

	public void setEspecialidad(List<Especialidad> especialidad) {
		this.especialidad = especialidad;
	}
	
	

}

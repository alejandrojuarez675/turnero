package com.sanatorio.espanol.backend.dto;

public class Profesional {

	public Integer codigo;
	public String nombreApellido;
	public String observaciones;
	public String matriculaProfesional;
	public Integer codigoProfesion;
	
	public Especialidad especialidad;

	public Profesional() {
		super();
	}
	
	public Profesional(Integer codigo, String nombreApellido, String observaciones, Especialidad especialidad) {
		super();
		this.codigo = codigo;
		this.nombreApellido = nombreApellido;
		this.observaciones = observaciones;
		this.especialidad = especialidad;
	}
	
	public Profesional(String nombreApellido, String matriculaProfesional, Integer codigoProfesion) {
		super();
		this.nombreApellido = nombreApellido;
		this.matriculaProfesional = matriculaProfesional;
		this.codigoProfesion = codigoProfesion;
	}

	public Integer getCodigo() {
		return codigo;
	}

	public String getNombreApellido() {
		return nombreApellido;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public String getMatriculaProfesional() {
		return matriculaProfesional;
	}

	public Integer getCodigoProfesion() {
		return codigoProfesion;
	}

	public Especialidad getEspecialidad() {
		return especialidad;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	public void setNombreApellido(String nombreApellido) {
		this.nombreApellido = nombreApellido;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public void setMatriculaProfesional(String matriculaProfesional) {
		this.matriculaProfesional = matriculaProfesional;
	}

	public void setCodigoProfesion(Integer codigoProfesion) {
		this.codigoProfesion = codigoProfesion;
	}

	public void setEspecialidad(Especialidad especialidad) {
		this.especialidad = especialidad;
	}
	
	

}

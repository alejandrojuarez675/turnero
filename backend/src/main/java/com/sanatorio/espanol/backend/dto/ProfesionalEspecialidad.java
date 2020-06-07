package com.sanatorio.espanol.backend.dto;

public class ProfesionalEspecialidad {

	public Integer codigo;
	public String nombreApellido;
	public String observaciones;
	
	public Especialidad especialidad;

	public ProfesionalEspecialidad() {
		super();
	}
	
	public ProfesionalEspecialidad(Integer codigo, String nombreApellido, String observaciones, Especialidad especialidad) {
		super();
		this.codigo = codigo;
		this.nombreApellido = nombreApellido;
		this.observaciones = observaciones;
		this.especialidad = especialidad;
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

	public void setEspecialidad(Especialidad especialidad) {
		this.especialidad = especialidad;
	}
	
	

}

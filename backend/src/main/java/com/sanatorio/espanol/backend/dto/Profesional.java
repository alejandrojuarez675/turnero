package com.sanatorio.espanol.backend.dto;

public class Profesional {

	Integer codigo;
	String nombreApellido;
	String observaciones;
	public Especialidad especialidad;

	public Profesional(Integer codigo, String nombreApellido, String observaciones, Especialidad especialidad) {
		super();
		this.codigo = codigo;
		this.nombreApellido = nombreApellido;
		this.observaciones = observaciones;
		this.especialidad = especialidad;
	}
	
	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}
	public String getNombreApellido() {
		return nombreApellido;
	}

	public void setNombreApellido(String nombreApellido) {
		this.nombreApellido = nombreApellido;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public Especialidad getEspecialidad() {
		return especialidad;
	}

	public void setEspecialidad(Especialidad especialidad) {
		this.especialidad = especialidad;
	}
	

}

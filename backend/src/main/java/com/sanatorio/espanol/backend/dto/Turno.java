package com.sanatorio.espanol.backend.dto;

import java.util.Date;

public class Turno {

	Integer codigo;
	Profesional profesional;
	CentroAtencion centroAtencion;
	Date fecha;
	String hora;
	String observaciones;

	public Turno(Integer codigo, 
			Profesional profesional, CentroAtencion centroAtencion,
			Date fecha, String hora, String observaciones) {
		super();
		this.codigo = codigo;
		this.profesional = profesional;
		this.centroAtencion = centroAtencion;
		this.fecha = fecha;
		this.hora = hora;
		this.observaciones = observaciones;
	}

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}
	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public Profesional getProfesional() {
		return profesional;
	}

	public void setProfesional(Profesional profesional) {
		this.profesional = profesional;
	}


	public CentroAtencion getCentroAtencion() {
		return centroAtencion;
	}

	public void setCentroAtencion(CentroAtencion centroAtencion) {
		this.centroAtencion = centroAtencion;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}
	

}

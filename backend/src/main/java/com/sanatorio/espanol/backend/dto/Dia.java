package com.sanatorio.espanol.backend.dto;

import java.util.Date;

public class Dia {

	Date fecha;
	Boolean conDisponibilidad;
	
	public Dia(Date fecha, Boolean conDisponibilidad) {
		super();
		this.fecha = fecha;
		this.conDisponibilidad = conDisponibilidad;
	}
	
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public Boolean getConDisponibilidad() {
		return conDisponibilidad;
	}
	public void setConDisponibilidad(Boolean conDisponibilidad) {
		this.conDisponibilidad = conDisponibilidad;
	}
}

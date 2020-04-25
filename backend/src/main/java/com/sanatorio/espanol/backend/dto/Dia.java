package com.sanatorio.espanol.backend.dto;

import java.time.LocalDateTime;

public class Dia {

	String fecha;
	Boolean conDisponibilidad;
	
	public Dia(String fecha, Boolean conDisponibilidad) {
		super();
		this.fecha = fecha;
		this.conDisponibilidad = conDisponibilidad;
	}
	
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public Boolean getConDisponibilidad() {
		return conDisponibilidad;
	}
	public void setConDisponibilidad(Boolean conDisponibilidad) {
		this.conDisponibilidad = conDisponibilidad;
	}
}

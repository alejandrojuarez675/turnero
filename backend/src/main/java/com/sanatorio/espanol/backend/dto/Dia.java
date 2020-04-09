package com.sanatorio.espanol.backend.dto;

import java.time.LocalDateTime;

public class Dia {

	LocalDateTime fecha;
	Boolean conDisponibilidad;
	
	public Dia(LocalDateTime fecha, Boolean conDisponibilidad) {
		super();
		this.fecha = fecha;
		this.conDisponibilidad = conDisponibilidad;
	}
	
	public LocalDateTime getFecha() {
		return fecha;
	}
	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}
	public Boolean getConDisponibilidad() {
		return conDisponibilidad;
	}
	public void setConDisponibilidad(Boolean conDisponibilidad) {
		this.conDisponibilidad = conDisponibilidad;
	}
}

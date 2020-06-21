package com.sanatorio.espanol.backend.dto;

import java.time.LocalDateTime;

public class Dia {

	String fecha;
	Boolean conDisponibilidadTM;
	Boolean conDisponibilidadTT;
	
	public Dia(String fecha, Boolean conDisponibilidadTM, Boolean conDisponibilidadTT) {
		super();
		this.fecha = fecha;
		this.conDisponibilidadTM = conDisponibilidadTM;
		this.conDisponibilidadTT = conDisponibilidadTT;
	}
	
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public Boolean getConDisponibilidadTT() {
		return conDisponibilidadTT;
	}
	public void setConDisponibilidadTT(Boolean conDisponibilidadTT) {
		this.conDisponibilidadTT = conDisponibilidadTT;
	}
	public Boolean getConDisponibilidadTM() {
		return conDisponibilidadTM;
	}
	public void setConDisponibilidadTM(Boolean conDisponibilidadTM) {
		this.conDisponibilidadTM = conDisponibilidadTM;
	}
}

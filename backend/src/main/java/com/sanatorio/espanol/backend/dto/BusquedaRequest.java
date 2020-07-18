package com.sanatorio.espanol.backend.dto;

import java.util.Date;

public class BusquedaRequest {

	public Date fechaNacimiento; 
	
	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}
	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}	
}

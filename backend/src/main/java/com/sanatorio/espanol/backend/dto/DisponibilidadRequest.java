package com.sanatorio.espanol.backend.dto;

import java.util.Date;

public class DisponibilidadRequest {

	public Date fechaNacimiento; 
	public Integer codigoObraSocial;
	public Integer codigoPlan;
	public Integer codigoEspecialidad;
	public Integer codigoCentroAtencion;	
	public ProfesionalEspecialidad profesional;
	
	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}
	public Integer getCodigoObraSocial() {
		return codigoObraSocial;
	}
	public Integer getCodigoPlan() {
		return codigoPlan;
	}
	public Integer getCodigoEspecialidad() {
		return codigoEspecialidad;
	}
	public Integer getCodigoCentroAtencion() {
		return codigoCentroAtencion;
	}
	public ProfesionalEspecialidad getProfesional() {
		return profesional;
	}
	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}
	public void setCodigoObraSocial(Integer codigoObraSocial) {
		this.codigoObraSocial = codigoObraSocial;
	}
	public void setCodigoPlan(Integer codigoPlan) {
		this.codigoPlan = codigoPlan;
	}
	public void setCodigoEspecialidad(Integer codigoEspecialidad) {
		this.codigoEspecialidad = codigoEspecialidad;
	}
	public void setCodigoCentroAtencion(Integer codigoCentroAtencion) {
		this.codigoCentroAtencion = codigoCentroAtencion;
	}
	public void setProfesional(ProfesionalEspecialidad profesional) {
		this.profesional = profesional;
	}
	
	
}

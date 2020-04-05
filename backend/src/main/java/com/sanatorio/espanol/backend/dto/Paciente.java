package com.sanatorio.espanol.backend.dto;

import java.util.Date;

public class Paciente {

	public String dni;
	public String sexo;
	public String nombreApellido;
	public String telefono;
	public String email;
	public Date fechaNacimiento; 
	public Integer codigoObraSocial;
	public Integer codigoPlan;
	
	public String getDni() {
		return dni;
	}
	public void setDni(String dni) {
		this.dni = dni;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public String getNombreApellido() {
		return nombreApellido;
	}
	public void setNombreApellido(String nombreApellido) {
		this.nombreApellido = nombreApellido;
	}
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}
	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}
	public Integer getCodigoObraSocial() {
		return codigoObraSocial;
	}
	public void setCodigoObraSocial(Integer codigoObraSocial) {
		this.codigoObraSocial = codigoObraSocial;
	}
	public Integer getCodigoPlan() {
		return codigoPlan;
	}
	public void setCodigoPlan(Integer codigoPlan) {
		this.codigoPlan = codigoPlan;
	}
}

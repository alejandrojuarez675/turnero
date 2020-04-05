package com.sanatorio.espanol.backend.dto;

public class ReservaRequest {

	public Integer codigoTurno;
	public Paciente paciente;
	
	public Integer getCodigoTurno() {
		return codigoTurno;
	}
	public void setCodigoTurno(Integer codigoTurno) {
		this.codigoTurno = codigoTurno;
	}
	public Paciente getPaciente() {
		return paciente;
	}
	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}
	
}

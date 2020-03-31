package com.sanatorio.espanol.backend.dto;

import java.util.List;

public class DiaRespuesta extends Respuesta{

	public List<Dia> dia;

	public List<Dia> getDia() {
		return dia;
	}

	public void setDia(List<Dia> dia) {
		this.dia = dia;
	}
	
}

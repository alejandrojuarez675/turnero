package com.sanatorio.espanol.backend.dto;

import java.util.List;

public class ObraSocialDTO {

	public Integer codigo;
	public String nombre;
	public List<PlanDTO> plan;
	
	public ObraSocialDTO(Integer integer, String nombre, List<PlanDTO> plan) {
		super();
		this.codigo = integer;
		this.nombre = nombre;
		this.plan = plan;
	}
	
	
}

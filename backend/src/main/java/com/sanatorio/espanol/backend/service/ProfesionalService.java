package com.sanatorio.espanol.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.Especialidad;
import com.sanatorio.espanol.backend.dto.Profesional;

@Service
public class ProfesionalService {

	public List<Profesional> getListaProfesional() {
		return listaProfesional;
	}
	
	public Profesional findProfesionalByCodigo(Integer c) {
		return listaProfesional.stream()
				.filter(p -> p.getCodigo().equals(c))
				.findFirst().orElse(null);
	}
	
	public static List<Profesional> listaProfesional = 
		new ArrayList<Profesional>(Arrays.asList(
				new Profesional(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new Profesional(2, "María Gonzalez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new Profesional(3, "Mario Gomez", "", new Especialidad(1, "KINESIOLOGÍA"))
		));
	
}

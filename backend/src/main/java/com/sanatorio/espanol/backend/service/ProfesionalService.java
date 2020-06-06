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

	public static List<Profesional> listaProfesional2 = 
			new ArrayList<Profesional>(Arrays.asList(
					new Profesional("Juan Perez", "123", 1),
					new Profesional("María Gonzalez", "456", 2),
					new Profesional("Mario Gomez", "789", 1)
			));	
	
	
	
	public List<Profesional> getListaProfesionalCombo() {
		return listaProfesional2;
	}
	
	public Profesional findProfesionalByNombre(String c) {
		return listaProfesional2.stream()
				.filter(p -> p.getNombreApellido().trim().equals(c.trim()))
				.findFirst().orElse(null);
	}

}

package com.sanatorio.espanol.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.Especialidad;
import com.sanatorio.espanol.backend.dto.Profesional;
import com.sanatorio.espanol.backend.dto.ProfesionalEspecialidad;

@Service
public class ProfesionalService {

	public List<ProfesionalEspecialidad> getListaProfesional() {
		return listaProfesional;
	}
	
	public ProfesionalEspecialidad findProfesionalByCodigo(Integer c) {
		return listaProfesional.stream()
				.filter(p -> p.getCodigo().equals(c))
				.findFirst().orElse(null);
	}
	
	public static List<ProfesionalEspecialidad> listaProfesional = 
		new ArrayList<ProfesionalEspecialidad>(Arrays.asList(
				new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new ProfesionalEspecialidad(2, "María Gonzalez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new ProfesionalEspecialidad(3, "Mario Gomez", "", new Especialidad(1, "KINESIOLOGÍA"))
		));

	public static List<Especialidad> listaEspecialidad = 
			new ArrayList<Especialidad>(Arrays.asList(
					new Especialidad(1, "KINESIOLOGÍA              "),
					new Especialidad(1, "KINESIOLOGÍA OTRA")
			));
	
	public static List<Especialidad> listaEspecialidad2 = 
			new ArrayList<Especialidad>(Arrays.asList(
					new Especialidad(3, "CARGIOLOGÍA        ")
					));
			
	public static List<Profesional> listaProfesional2 = 
			new ArrayList<Profesional>(Arrays.asList(
					new Profesional("Juan Perez", "123", 1, listaEspecialidad),
					new Profesional("María Gonzalez", "456", 2, listaEspecialidad),
					new Profesional("Mario Gomez", "789", 1, listaEspecialidad2)
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

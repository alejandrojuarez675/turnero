package com.sanatorio.espanol.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.Especialidad;

@Service
public class EspecialidadService {

	public List<Especialidad> getListaEspecialidad() {
		return listaEspecialidad;
	}
	
	public Especialidad findEspecialidadByCodigo(Integer c) {
		return listaEspecialidad.stream()
				.filter(p -> p.getCodigo().equals(c))
				.findFirst().orElse(null);
	}
	
	public static List<Especialidad> listaEspecialidad = 
		new ArrayList<Especialidad>(Arrays.asList(
				new Especialidad(1, "KINESIOLOGÍA"),
				new Especialidad(2, "ENDOCRINOLOGÍA"),
				new Especialidad(3, "CARGIOLOGÍA"),
				new Especialidad(4, "CLÍNICA MÉDICA")
		));
	
}

package com.sanatorio.espanol.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.CentroAtencion;

@Service
public class CentroAtencionService {

	public List<CentroAtencion> getListaCentroAtencion() {
		return listaCentroAtencion;
	}
	
	public CentroAtencion findCentroAtencionByCodigo(Integer c) {
		return listaCentroAtencion.stream()
				.filter(p -> p.getCodigo().equals(c))
				.findFirst().orElse(null);
	}
	
	public static List<CentroAtencion> listaCentroAtencion = 
		new ArrayList<CentroAtencion>(Arrays.asList(
				new CentroAtencion(1, "HOSPITAL ESPAÑOL")
		));
	
}

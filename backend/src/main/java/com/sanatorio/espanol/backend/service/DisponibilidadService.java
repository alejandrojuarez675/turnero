package com.sanatorio.espanol.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.CentroAtencion;
import com.sanatorio.espanol.backend.dto.Disponibilidad;
import com.sanatorio.espanol.backend.dto.Especialidad;
import com.sanatorio.espanol.backend.dto.Profesional;
import com.sanatorio.espanol.backend.dto.TurnoManiana;
import com.sanatorio.espanol.backend.dto.TurnoTarde;

@Service
public class DisponibilidadService {
	
	public List<Disponibilidad> getListaDisponibilidad() {
		return listaDisponibilidad;
	}
	
	public static List<Disponibilidad> listaDisponibilidad = 
		new ArrayList<Disponibilidad>(Arrays.asList(
			new Disponibilidad(
				new Profesional(1, "Juan Perez", ""), 
				new Especialidad(1, "KINESIOLOGÍA"), 
				new TurnoManiana(
						400, 
						new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
						new Date(), "10:10", ""), 
				new TurnoTarde(
						400, 
						new CentroAtencion(1, "HOSPITAL ESPAÑOL"), 
						new Date(), "18:10", "")
			)
		));
}

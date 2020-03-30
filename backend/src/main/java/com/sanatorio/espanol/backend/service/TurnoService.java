package com.sanatorio.espanol.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.CentroAtencion;
import com.sanatorio.espanol.backend.dto.Especialidad;
import com.sanatorio.espanol.backend.dto.Profesional;
import com.sanatorio.espanol.backend.dto.Turno;

@Service
public class TurnoService {
	
	public List<Turno> getListaTurno() {
		return listaTurno;
	}
	
	public static List<Turno> listaTurno = 
		new ArrayList<Turno>(Arrays.asList(
			new Turno(
				400, 
				new Profesional(1, "Juan Perez", ""),
				new Especialidad(1, "KINESIOLOGÍA"),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "10:10", ""),
			new Turno(
				401, 
				new Profesional(1, "Juan Perez", ""),
				new Especialidad(1, "KINESIOLOGÍA"),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "18:10", "")
		));
}

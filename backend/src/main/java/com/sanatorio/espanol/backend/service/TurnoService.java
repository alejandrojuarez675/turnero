package com.sanatorio.espanol.backend.service;

import static java.util.stream.Collectors.toList;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.CentroAtencion;
import com.sanatorio.espanol.backend.dto.Especialidad;
import com.sanatorio.espanol.backend.dto.HorarioRequest;
import com.sanatorio.espanol.backend.dto.ProfesionalEspecialidad;
import com.sanatorio.espanol.backend.dto.Turno;

@Service
public class TurnoService {
	
	public Turno getTurnoConfirmado() {
		return new Turno(
				400, 
				new ProfesionalEspecialidad(1, "Juan Perez", "",new Especialidad(1, "KINESIOLOGÍA")),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "10:10", "");
	}
	
	public static List<Turno> listaTurnoReducida = 
			new ArrayList<Turno>(Arrays.asList(
				new Turno(
					400, 
					new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
					new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
					new Date(), "10:10", ""),
				new Turno(
					401, 
					new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
					new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
					new Date(), "18:10", "")
			));
	
	public static List<Turno> listaTurno = 
		new ArrayList<Turno>(Arrays.asList(
			new Turno(
				400, 
				new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "10:10 a.m.", "solo particular"),
		new Turno(
				400, 
				new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "10:20 a.m.", ""),
		new Turno(
				400, 
				new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "10:30 a.m.", ""),
		new Turno(
				400, 
				new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "12:00 a.m.", ""),
			new Turno(
				400, 
				new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "14:45 p.m.", ""),
			new Turno(
				400, 
				new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "16:45 p.m.", "solo particular"),
			new Turno(
				400, 
				new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "17:00 p.m.", "Solo particular"),
			new Turno(
				401, 
				new ProfesionalEspecialidad(1, "Juan Perez", "", new Especialidad(1, "KINESIOLOGÍA")),
				new CentroAtencion(1, "HOSPITAL ESPAÑOL"),
				new Date(), "18:10 p.m.", "")
		));

	public List<Turno> getListaTurno(HorarioRequest horaRequest) {
		if (horaRequest.codigoProfesional != null) {
			return listaTurnoReducida.stream()
					.map(x-> x = modificarFechaTurno(x, horaRequest))
					.collect(toList());
		}
		return listaTurno.stream()
				.map(x-> x = modificarFechaTurno(x, horaRequest))
				.collect(toList());
	}

	private Turno modificarFechaTurno(Turno x, HorarioRequest horaRequest) {
		x.setFecha(horaRequest.fecha);
		return x;
	}
}

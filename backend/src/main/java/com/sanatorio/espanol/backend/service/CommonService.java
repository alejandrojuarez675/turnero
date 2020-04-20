package com.sanatorio.espanol.backend.service;

import java.util.GregorianCalendar;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.CentroAtencionRespuesta;
import com.sanatorio.espanol.backend.dto.ConfirmacionRequest;
import com.sanatorio.espanol.backend.dto.ConfirmacionRespuesta;
import com.sanatorio.espanol.backend.dto.DiaRequest;
import com.sanatorio.espanol.backend.dto.DiaRespuesta;
import com.sanatorio.espanol.backend.dto.Disponibilidad;
import com.sanatorio.espanol.backend.dto.DisponibilidadRequest;
import com.sanatorio.espanol.backend.dto.DisponibilidadRespuesta;
import com.sanatorio.espanol.backend.dto.EspecialidadRespuesta;
import com.sanatorio.espanol.backend.dto.HorarioRequest;
import com.sanatorio.espanol.backend.dto.HorarioRespuesta;
import com.sanatorio.espanol.backend.dto.ObraSocialRespuesta;
import com.sanatorio.espanol.backend.dto.Reserva;
import com.sanatorio.espanol.backend.dto.ReservaRequest;
import com.sanatorio.espanol.backend.dto.ReservaRespuesta;
import com.sanatorio.espanol.backend.dto.RespuestaDTO;

@Service
public class CommonService {

	public static Integer CODIGO_RTA_OK = 200; 

	@Autowired private ObraSocialService obraSocialService;
	@Autowired private EspecialidadService especialidadService;
	@Autowired private CentroAtencionService centroAtencionService;
	@Autowired private DisponibilidadService disponibilidadService;
	@Autowired private DiaService diaService;
	@Autowired private TurnoService turnoService;
	
	public static RespuestaDTO getRespuestaOK() {
		return new RespuestaDTO(CODIGO_RTA_OK, "OK");
	}
	
	public ObraSocialRespuesta getObraSocial() {
		ObraSocialRespuesta oBS = new ObraSocialRespuesta();
    	oBS.obraSocial =  obraSocialService.getListaObraSocial();
		oBS.respuesta = getRespuestaOK();
    	return oBS;
	}
	
	public EspecialidadRespuesta getEspecialidad() {
		EspecialidadRespuesta espeResp = new EspecialidadRespuesta();
		espeResp.respuesta = getRespuestaOK();
		espeResp.especialidad = especialidadService.getListaEspecialidad();
		return espeResp;
	}
	
	public CentroAtencionRespuesta getCentro() {
		CentroAtencionRespuesta centroResp = new CentroAtencionRespuesta();
		centroResp.respuesta = getRespuestaOK();
		centroResp.centroAtencion = centroAtencionService.getListaCentroAtencion();
		return centroResp;
	}
	
	public DisponibilidadRespuesta busquedaProfe(DisponibilidadRequest disponibilidadRequest) {
	/*
		disponibilidadRequest.fechaNacimiento;
		disponibilidadRequest.codigoCentroAtencion;
		disponibilidadRequest.codigoObraSocial;
		disponibilidadRequest.codigoPlan
		*/
		// TODO:
		List<Disponibilidad> disponibilidades = disponibilidadService.getListaDisponibilidad()
			.stream()
			.filter(d -> d.profesional.especialidad.getCodigo().equals(disponibilidadRequest.codigoEspecialidad))
			.collect(Collectors.toList()); 
		DisponibilidadRespuesta espeResp = new DisponibilidadRespuesta();
    	espeResp.respuesta = getRespuestaOK();
    	espeResp.disponibilidad = disponibilidades;
    	
    	return espeResp;
    }

	public DiaRespuesta busquedaDias(DiaRequest diaRequest) {
		DiaRespuesta dResp = new DiaRespuesta();
		dResp.respuesta = getRespuestaOK();
		if (diaRequest.codigoProfesional != null) {
			System.out.println("busq por profesional " + diaRequest.codigoProfesional);
			dResp.dia = diaService.getListaDiaReducida();
		} else {
			System.out.println("busq todos " + diaRequest.codigoProfesional);
			dResp.dia = diaService.getListaDia();
		}
		return dResp;
	}

	public HorarioRespuesta busquedaHorarios(HorarioRequest horaRequest) {
		HorarioRespuesta hResp = new HorarioRespuesta();
		hResp.respuesta = getRespuestaOK();
    	hResp.turno = turnoService.getListaTurno(horaRequest);
    	return hResp;
	}

	public ReservaRespuesta reservaTurno(ReservaRequest reservaRequest) {
		ReservaRespuesta rResp = new ReservaRespuesta();
		rResp.respuesta = getRespuestaOK();
		
		System.out.println("reservaRequest turno " + reservaRequest.getCodigoTurno());
		System.out.println("reservaRequest dni " + reservaRequest.getPaciente().getDni());
		
    	rResp.reserva = new Reserva(1001, new GregorianCalendar(2020,5,1).getTime()); // TODO:
    	return rResp;
	}

	public ConfirmacionRespuesta confirmacionTurno(ConfirmacionRequest confRequest) {
		ConfirmacionRespuesta cResp = new ConfirmacionRespuesta();
		cResp.respuesta = getRespuestaOK();
    	cResp.turno = turnoService.getTurnoConfirmado();
    	return cResp;
	}
}

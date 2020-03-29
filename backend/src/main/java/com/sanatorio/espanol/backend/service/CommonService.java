package com.sanatorio.espanol.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.CentroAtencionRespuesta;
import com.sanatorio.espanol.backend.dto.Disponibilidad;
import com.sanatorio.espanol.backend.dto.DisponibilidadRequest;
import com.sanatorio.espanol.backend.dto.DisponibilidadRespuesta;
import com.sanatorio.espanol.backend.dto.EspecialidadRespuesta;
import com.sanatorio.espanol.backend.dto.ObraSocialRespuesta;
import com.sanatorio.espanol.backend.dto.RespuestaDTO;

@Service
public class CommonService {

	public static Integer CODIGO_RTA_OK = 200; 

	@Autowired
	private ObraSocialService obraSocialService;
	@Autowired
	private EspecialidadService especialidadService;
	@Autowired
	private CentroAtencionService centroAtencionService;
	@Autowired
	private DisponibilidadService disponibilidadService;
	
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
		List<Disponibilidad> disponibilidades = disponibilidadService.getListaDisponibilidad()
			.stream()
			.filter(d -> d.especialidad.getCodigo().equals(disponibilidadRequest.codigoEspecialidad))
			.collect(Collectors.toList()); 
		;
					    	;
    	DisponibilidadRespuesta espeResp = new DisponibilidadRespuesta();
    	espeResp.respuesta = getRespuestaOK();
    	espeResp.disponibilidad = disponibilidades;
    	
    	return espeResp;
    }
}

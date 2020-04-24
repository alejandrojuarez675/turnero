package com.sanatorio.espanol.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanatorio.espanol.backend.dto.CentroAtencionRespuesta;
import com.sanatorio.espanol.backend.dto.ConfirmacionRequest;
import com.sanatorio.espanol.backend.dto.ConfirmacionRespuesta;
import com.sanatorio.espanol.backend.dto.DiaRequest;
import com.sanatorio.espanol.backend.dto.DiaRespuesta;
import com.sanatorio.espanol.backend.dto.DisponibilidadRequest;
import com.sanatorio.espanol.backend.dto.DisponibilidadRespuesta;
import com.sanatorio.espanol.backend.dto.EspecialidadRespuesta;
import com.sanatorio.espanol.backend.dto.HorarioRequest;
import com.sanatorio.espanol.backend.dto.HorarioRespuesta;
import com.sanatorio.espanol.backend.dto.ObraSocialRespuesta;
import com.sanatorio.espanol.backend.dto.ReservaRequest;
import com.sanatorio.espanol.backend.dto.ReservaRespuesta;
import com.sanatorio.espanol.backend.service.CommonService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TurnoController {

	@Autowired
	private CommonService commonService;
	
	@RequestMapping("/Consext/getObraSocial")
    public ObraSocialRespuesta getObraSocial() {
		ObraSocialRespuesta oBS = commonService.getObraSocial();
		Integer a = null; a.equals(a);
		return oBS;
    }
	
	@RequestMapping("/Consext/getEspecialidad")
    public EspecialidadRespuesta getEspecialidades() {
		EspecialidadRespuesta espeResp = commonService.getEspecialidad();
    	return espeResp;
    }

	@RequestMapping("/Gestion/getCentroAtencion")
    public CentroAtencionRespuesta getCentro() {
		CentroAtencionRespuesta centroResp = commonService.getCentro();
		return centroResp;
    }

	@PostMapping("/Consext/busquedaProfesionales")
    public DisponibilidadRespuesta busquedaProfesionales(@RequestBody DisponibilidadRequest disponibilidadRequest) {
		DisponibilidadRespuesta espeResp = commonService.busquedaProfe(disponibilidadRequest);
    	return espeResp;
    }

	@PostMapping("/Consext/busquedaDiasDisponibles")
    public DiaRespuesta busquedaDiasDisponibles(@RequestBody DiaRequest diaRequest) {
		DiaRespuesta diaResp = commonService.busquedaDias(diaRequest);
    	return diaResp;
    }
	
	@PostMapping("/Consext/busquedaHorarios")
    public HorarioRespuesta busquedaHorarios(@RequestBody HorarioRequest horaRequest) {
		HorarioRespuesta horaResp = commonService.busquedaHorarios(horaRequest);
    	return horaResp;
    }
	
	@PostMapping("/Consext/reservaTurno")
    public ReservaRespuesta reservaTurno(@RequestBody ReservaRequest reservaRequest) {
		ReservaRespuesta reservaResp = commonService.reservaTurno(reservaRequest);
    	return reservaResp;
    }
	
	@PostMapping("/Consext/confirmacionTurno")
    public ConfirmacionRespuesta confirmacionTurno(@RequestBody ConfirmacionRequest confRequest) {
		ConfirmacionRespuesta confRta = commonService.confirmacionTurno(confRequest);
    	return confRta;
    }
}

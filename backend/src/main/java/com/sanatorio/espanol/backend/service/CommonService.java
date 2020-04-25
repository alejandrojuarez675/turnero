package com.sanatorio.espanol.backend.service;

import java.util.GregorianCalendar;
import java.util.List;
import java.util.stream.Collectors;

import javax.xml.ws.http.HTTPException;

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
import com.sanatorio.espanol.backend.dto.LoginDTO;
import com.sanatorio.espanol.backend.dto.LoginRespuesta;
import com.sanatorio.espanol.backend.dto.ObraSocialRespuesta;
import com.sanatorio.espanol.backend.dto.Reserva;
import com.sanatorio.espanol.backend.dto.ReservaRequest;
import com.sanatorio.espanol.backend.dto.ReservaRespuesta;
import com.sanatorio.espanol.backend.dto.RespuestaDTO;

@Service
public class CommonService {

	public static Integer CODIGO_RTA_OK = 200; 
	public static Integer CODIGO_RTA_500 = 500;

	@Autowired private ObraSocialService obraSocialService;
	@Autowired private EspecialidadService especialidadService;
	@Autowired private CentroAtencionService centroAtencionService;
	@Autowired private DisponibilidadService disponibilidadService;
	@Autowired private DiaService diaService;
	@Autowired private TurnoService turnoService;
	
	public static RespuestaDTO getRespuestaOK() {
		return new RespuestaDTO(CODIGO_RTA_OK, "OK");
	}
	public static RespuestaDTO getRespuesta500() {
		return new RespuestaDTO(CODIGO_RTA_500, "Error parametros");
	}

	public LoginRespuesta login(LoginDTO loginRequest) {
		return new LoginRespuesta();
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
		DisponibilidadRespuesta espeResp = new DisponibilidadRespuesta();
    	
		if (disponibilidadRequest.fechaNacimiento == null ||
				disponibilidadRequest.codigoObraSocial == null || 
				disponibilidadRequest.codigoPlan == null || 
				disponibilidadRequest.codigoCentroAtencion == null || 
				disponibilidadRequest.codigoEspecialidad == null) {
			espeResp.respuesta = getRespuesta500();
			
		} else {
			List<Disponibilidad> disponibilidades = disponibilidadService.getListaDisponibilidad()
					.stream()
					.filter(d -> d.profesional.especialidad.getCodigo().equals(disponibilidadRequest.codigoEspecialidad))
					.collect(Collectors.toList()); 
				espeResp.respuesta = getRespuestaOK();
		    	espeResp.disponibilidad = disponibilidades;	
		}
		
    	return espeResp;
    }

	public DiaRespuesta busquedaDias(DiaRequest diaRequest) {
		DiaRespuesta dResp = new DiaRespuesta();
		if (diaRequest.fechaNacimiento == null ||
				diaRequest.codigoObraSocial == null || 
				diaRequest.codigoPlan == null || 
				diaRequest.codigoCentroAtencion == null || 
				diaRequest.codigoEspecialidad == null) {
			dResp.respuesta = getRespuesta500();
			
		} else {
			dResp.respuesta = getRespuestaOK();
			if (diaRequest.codigoProfesional != null) {
				System.out.println("busq por profesional " + diaRequest.codigoProfesional);
				dResp.dia = diaService.getListaDiaReducida();
			} else {
				System.out.println("busq todos " + diaRequest.codigoProfesional);
				dResp.dia = diaService.getListaDia();
			}
		}
		return dResp;
	}

	public HorarioRespuesta busquedaHorarios(HorarioRequest horaRequest) {
		HorarioRespuesta hResp = new HorarioRespuesta();
		if (horaRequest.fecha == null || 
				horaRequest.fechaNacimiento == null ||
				horaRequest.codigoObraSocial == null || 
				horaRequest.codigoPlan == null || 
				horaRequest.codigoCentroAtencion == null || 
				horaRequest.codigoEspecialidad == null) {
			hResp.respuesta = getRespuesta500();
		} else {
			hResp.respuesta = getRespuestaOK();
			hResp.turno = turnoService.getListaTurno(horaRequest);
		}
    	return hResp;
	}

	public ReservaRespuesta reservaTurno(ReservaRequest reservaRequest) {
		ReservaRespuesta rResp = new ReservaRespuesta();
		if (reservaRequest.getCodigoTurno() == null || 
				reservaRequest.getPaciente().getDni() == null || reservaRequest.getPaciente().getDni().trim().isEmpty() ||
				(!"F".equals(reservaRequest.getPaciente().getSexo()) && 
					!"M".equals(reservaRequest.getPaciente().getSexo())) ||
				reservaRequest.getPaciente().getNombreApellido() == null || reservaRequest.getPaciente().getNombreApellido().trim().isEmpty() ||
				reservaRequest.getPaciente().getTelefono() == null || reservaRequest.getPaciente().getTelefono().trim().isEmpty() ||
				reservaRequest.getPaciente().getEmail() == null || reservaRequest.getPaciente().getEmail().trim().isEmpty() ||
				reservaRequest.getPaciente().getFechaNacimiento() == null ||
				reservaRequest.getPaciente().getCodigoObraSocial() == null ||
				reservaRequest.getPaciente().getCodigoPlan() == null ||
				reservaRequest.getPaciente().getCodigoPlan() == null ||
				reservaRequest.getPaciente().getCodigoProfesional() == null
			) {
			rResp.respuesta = getRespuesta500();
		}
		else {
			rResp.respuesta = getRespuestaOK();
			rResp.reserva = new Reserva(1001, new GregorianCalendar(2020,5,1).getTime()); // TODO:
		}
    	return rResp;
	}

	public ConfirmacionRespuesta confirmacionTurno(ConfirmacionRequest confRequest) {
		ConfirmacionRespuesta cResp = new ConfirmacionRespuesta();
		
		if (confRequest.codigoReserva == null) {
			cResp.respuesta = getRespuesta500();
		} else {
			cResp.respuesta = getRespuestaOK();
			cResp.turno = turnoService.getTurnoConfirmado();
		}
		
    	return cResp;
	}

}

package com.sanatorio.espanol.backend.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanatorio.espanol.backend.dto.CentroAtencion;
import com.sanatorio.espanol.backend.dto.CentroAtencionRespuesta;
import com.sanatorio.espanol.backend.dto.Disponibilidad;
import com.sanatorio.espanol.backend.dto.DisponibilidadRequest;
import com.sanatorio.espanol.backend.dto.DisponibilidadRespuesta;
import com.sanatorio.espanol.backend.dto.Especialidad;
import com.sanatorio.espanol.backend.dto.EspecialidadRespuesta;
import com.sanatorio.espanol.backend.dto.ObraSocialDTO;
import com.sanatorio.espanol.backend.dto.ObraSocialRespuesta;
import com.sanatorio.espanol.backend.dto.PlanDTO;
import com.sanatorio.espanol.backend.dto.Profesional;
import com.sanatorio.espanol.backend.dto.RespuestaDTO;
import com.sanatorio.espanol.backend.dto.TurnoManiana;
import com.sanatorio.espanol.backend.dto.TurnoTarde;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TurnoController {

	@RequestMapping("/getObraSocial")
    public ObraSocialRespuesta getObraSocial() {
		
    	ObraSocialRespuesta oBS = new ObraSocialRespuesta();
    	RespuestaDTO res = new RespuestaDTO();
    	res.codigo = 200;
    	res.mensaje = "OK";
    	
    	oBS.respuesta = res;

    	List<ObraSocialDTO> obraSociales = new ArrayList<ObraSocialDTO>();
		for (int i = 0; i < 10; i++) {
			ObraSocialDTO obraSocDTO = new ObraSocialDTO();
			obraSocDTO.codigo = Long.valueOf(String.valueOf(i));
			obraSocDTO.nombre = "Obra Social " + i;
			List<PlanDTO> planes = new ArrayList<PlanDTO>();
			for (int j = 2; j < 8; j++) {
				PlanDTO plan = new PlanDTO();
				plan.codigo = j + i + "0";
				plan.nombre = j + i + "0";
				planes.add(plan);
			}
			
			obraSocDTO.plan = planes;
			obraSociales.add(obraSocDTO);
		}
		
		oBS.obraSocial = obraSociales;
		return oBS;
    }

	
	@RequestMapping("/getEspecialidad")
    public EspecialidadRespuesta getEspecialidades() {
		
    	EspecialidadRespuesta espeResp = new EspecialidadRespuesta();
    	RespuestaDTO res = new RespuestaDTO();
    	res.codigo = 200;
    	res.mensaje = "OK";
    	
    	espeResp.respuesta = res;
		List<Especialidad> especialidades = new ArrayList<Especialidad>();
		for (int i = 0; i < 10; i++) {
			Especialidad especialidad = new Especialidad();
			especialidad.setCodigo(Integer.valueOf(i));
			especialidad.setNombre("Especialidad desc " + i);
			especialidades.add(especialidad);
		}
		
		espeResp.especialidad = especialidades;
		return espeResp;
    }

	@RequestMapping("/getCentroAtencion")
    public CentroAtencionRespuesta getCentro() {
		
    	CentroAtencionRespuesta centroResp = new CentroAtencionRespuesta();
    	RespuestaDTO res = new RespuestaDTO();
    	res.codigo = 200;
    	res.mensaje = "OK";
    	
    	centroResp.respuesta = res;
    	CentroAtencion centro1 = new CentroAtencion();
    	centro1.setCodigo("HE");
    	centro1.setNombre("HOSPITAL ESPAÑOL");
		List<CentroAtencion >centros = new ArrayList<CentroAtencion>();
		centros.add(centro1);
		
    	CentroAtencion centro2 = new CentroAtencion();
    	centro2.setCodigo("HEC");
    	centro2.setNombre("HOSPITAL ESPAÑOL CENTRO");
    	centros.add(centro2);
		centroResp.centroAtencion = centros;
		
		return centroResp;
    }

	@PostMapping("busquedaProfesionales")
    public DisponibilidadRespuesta busquedaProfe(@RequestBody DisponibilidadRequest disponibilidadRequest) {
		
    	DisponibilidadRespuesta espeResp = new DisponibilidadRespuesta();
    	RespuestaDTO res = new RespuestaDTO();
    	res.codigo = 200;
    	res.mensaje = "OK";

    	Disponibilidad disp = new Disponibilidad();
    	List<Disponibilidad> disponibilidades = new ArrayList<Disponibilidad>();
    	Profesional prof1 = new Profesional();
    	prof1.setCodigo("PeJu");
    	prof1.setNombreApellido("Perez, Juan");
    	prof1.setObservaciones("No HAy");
    	
    	Especialidad esp = new Especialidad();
    	esp.setCodigo(disponibilidadRequest.codigoEspecialidad);
    	esp.setNombre("Especialidad desc " + disponibilidadRequest.codigoEspecialidad);
    	CentroAtencion centro2 = new CentroAtencion();
    	centro2.setCodigo("HEC");
    	centro2.setNombre("HOSPITAL ESPAÑOL CENTRO");

    	TurnoManiana man = new TurnoManiana();
    	man.setCodigo("148");
    	man.setCentroAtencion(centro2);
    	man.setFecha(new Date("2020/03/28"));
    	man.setHora("10:10");
    	
    	TurnoTarde tar = new TurnoTarde();
    	tar.setCodigo("348");
    	tar.setCentroAtencion(centro2);
    	tar.setFecha(new Date("2020/03/30"));
    	tar.setHora("15:30");


    	disp.profesional = prof1;
    	disp.especialidad = esp;
    	disp.turnoManiana = man;
    	disp.turnoTarde = tar;
    	disponibilidades.add(disp);

    	Profesional prof2 = new Profesional();
    	prof2.setCodigo("LoRo");
    	prof2.setNombreApellido("Lopes, Roberto");
    	prof2.setObservaciones("No HAy");

    	TurnoManiana man2 = new TurnoManiana();
    	man2.setCodigo("149");
    	man2.setProfesional(prof1);
    	man2.setEspecialidad(esp);
    	man2.setCentroAtencion(centro2);
    	man2.setFecha(new Date("2020/04/01"));
    	man2.setHora("10:30");

    	TurnoTarde tar2 = new TurnoTarde();
    	tar2.setCodigo("349");
    	tar2.setProfesional(prof1);
    	tar2.setEspecialidad(esp);
    	tar2.setCentroAtencion(centro2);
    	tar2.setFecha(new Date("2020/04/10"));
    	tar2.setHora("15:50");

    	Disponibilidad disp2 = new Disponibilidad();
    	disp2.profesional = prof2;
    	disp2.turnoManiana = man2;
    	disp2.turnoTarde = tar2;
   	
    	
    	disponibilidades.add(disp2);
    	espeResp.respuesta = res;
    	espeResp.disponibilidad = disponibilidades;
    	return espeResp;
    }

}

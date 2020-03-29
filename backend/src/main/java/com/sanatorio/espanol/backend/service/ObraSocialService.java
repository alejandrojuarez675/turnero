package com.sanatorio.espanol.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.ObraSocialDTO;
import com.sanatorio.espanol.backend.dto.PlanDTO;

@Service
public class ObraSocialService {

	public List<ObraSocialDTO> getListaObraSocial() {
		return listaObraSocial;
	}
	
	public static List<ObraSocialDTO> listaObraSocial = 
		new ArrayList<ObraSocialDTO>(Arrays.asList(
				new ObraSocialDTO(1, "OSDE", Arrays.asList(
						new PlanDTO(1,"210"),
						new PlanDTO(2,"310"),
						new PlanDTO(3,"410"),
						new PlanDTO(4,"450"),
						new PlanDTO(5,"550")
				)),
				new ObraSocialDTO(2, "ACA SALUD", Arrays.asList(
						new PlanDTO(6,"Integral"),
						new PlanDTO(7,"Selecta"),
						new PlanDTO(8,"Superior"),
						new PlanDTO(9,"Universal")
				)),
				new ObraSocialDTO(3, "OMINT", Arrays.asList(
						new PlanDTO(10,"Clásico Línea F"),
						new PlanDTO(11,"Global Cartilla 4500"),
						new PlanDTO(12,"Premium Linea 0")
				)),
				new ObraSocialDTO(4, "AMR SALUD", Arrays.asList(
						new PlanDTO(13,"1000"),
						new PlanDTO(14,"2000"),
						new PlanDTO(15,"Dorado"),
						new PlanDTO(16,"Especial"),
						new PlanDTO(17,"Oro"), 
						new PlanDTO(18,"Integral Joven")
				))	
		));
	
}

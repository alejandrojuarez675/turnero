package com.sanatorio.espanol.backend.dto;

import java.util.Date;

public class TurnoTarde extends Turno{

	public TurnoTarde(Integer codigo, CentroAtencion centroAtencion, 
			Date fecha, String hora, String observaciones) {
		super(codigo, null, null, centroAtencion, fecha, hora, observaciones);
	}

}

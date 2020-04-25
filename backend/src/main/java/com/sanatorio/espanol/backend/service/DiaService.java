package com.sanatorio.espanol.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.Dia;

@Service
public class DiaService {
	
	public List<Dia> getListaDia() {
		return listaDia;
	}

	public List<Dia> getListaDiaReducida() {
		return listaDiaReducida;
	}
	
	public static List<Dia> listaDiaReducida = 
			new ArrayList<Dia>(Arrays.asList(
				new Dia("2020-04-01", Boolean.TRUE), 
				new Dia("2020-04-05", Boolean.FALSE),
				new Dia("2020-04-08", Boolean.TRUE),
				new Dia("2020-04-09", Boolean.TRUE),
				new Dia("2020-04-15", Boolean.FALSE),
				new Dia("2020-04-16", Boolean.TRUE),
				new Dia("2020-04-29", Boolean.TRUE),
				new Dia("2020-04-30", Boolean.TRUE),
				new Dia("2020-05-06", Boolean.FALSE),
				new Dia("2020-05-07", Boolean.TRUE)
			));
	
	public static List<Dia> listaDia = 
		new ArrayList<Dia>(Arrays.asList(
			new Dia("2020-04-01", Boolean.TRUE), 
			new Dia("2020-04-05", Boolean.FALSE),
			new Dia("2020-04-06", Boolean.FALSE),
			new Dia("2020-04-08", Boolean.TRUE),
			new Dia("2020-04-09", Boolean.TRUE),
			new Dia("2020-04-15", Boolean.FALSE),
			new Dia("2020-04-16", Boolean.TRUE),
			new Dia("2020-04-18", Boolean.TRUE),
			new Dia("2020-04-24", Boolean.TRUE),
			new Dia("2020-04-29", Boolean.TRUE),
			new Dia("2020-04-30", Boolean.TRUE),
			new Dia("2020-05-01", Boolean.FALSE),
			new Dia("2020-05-02", Boolean.FALSE),
			new Dia("2020-05-03", Boolean.FALSE),
			new Dia("2020-05-06", Boolean.FALSE),
			new Dia("2020-05-07", Boolean.TRUE)
		)
	);
}

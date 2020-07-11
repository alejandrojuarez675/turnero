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
				new Dia("2020-06-01", Boolean.FALSE, Boolean.TRUE), 
				new Dia("2020-06-05", Boolean.FALSE, Boolean.TRUE),
				new Dia("2020-06-08", Boolean.FALSE, Boolean.TRUE),
				new Dia("2020-06-09", Boolean.FALSE, Boolean.FALSE),
				new Dia("2020-06-15", Boolean.FALSE, Boolean.FALSE),
				new Dia("2020-06-16", Boolean.FALSE, Boolean.FALSE),
				new Dia("2020-06-29", Boolean.FALSE, Boolean.TRUE),
				new Dia("2020-06-30", Boolean.FALSE, Boolean.TRUE),
				new Dia("2020-07-06", Boolean.FALSE, Boolean.FALSE),
				new Dia("2020-07-07", Boolean.FALSE, Boolean.FALSE)
			));
	
	public static List<Dia> listaDia = 
		new ArrayList<Dia>(Arrays.asList(
			new Dia("2020-06-01", Boolean.TRUE, Boolean.TRUE), 
			new Dia("2020-06-05", Boolean.FALSE, Boolean.FALSE),
			new Dia("2020-06-06", Boolean.FALSE, Boolean.TRUE),
			new Dia("2020-06-08", Boolean.TRUE, Boolean.TRUE),
			new Dia("2020-06-09", Boolean.TRUE, Boolean.TRUE),
			new Dia("2020-06-15", Boolean.FALSE, Boolean.TRUE),
			new Dia("2020-06-16", Boolean.TRUE, Boolean.FALSE),
			new Dia("2020-06-18", Boolean.TRUE, Boolean.TRUE),
			new Dia("2020-06-24", Boolean.TRUE, Boolean.TRUE),
			new Dia("2020-06-29", Boolean.TRUE, Boolean.TRUE),
			new Dia("2020-06-30", Boolean.TRUE, Boolean.TRUE),
			new Dia("2020-07-01", Boolean.FALSE, Boolean.FALSE),
			new Dia("2020-07-02", Boolean.FALSE, Boolean.FALSE),
			new Dia("2020-07-03", Boolean.FALSE, Boolean.TRUE),
			new Dia("2020-07-06", Boolean.FALSE, Boolean.FALSE),
			new Dia("2020-07-07", Boolean.TRUE, Boolean.FALSE)
		)
	);
}

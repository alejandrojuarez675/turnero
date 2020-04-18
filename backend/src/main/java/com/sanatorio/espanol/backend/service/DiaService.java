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
				new Dia(LocalDateTime.of(2020,4,1,0,0), Boolean.TRUE), 
				new Dia(LocalDateTime.of(2020,4,2,0,0), Boolean.FALSE),
				new Dia(LocalDateTime.of(2020,4,8,0,0), Boolean.TRUE),
				new Dia(LocalDateTime.of(2020,4,9,0,0), Boolean.TRUE),
				new Dia(LocalDateTime.of(2020,4,15,0,0), Boolean.FALSE),
				new Dia(LocalDateTime.of(2020,4,16,0,0), Boolean.TRUE),
				new Dia(LocalDateTime.of(2020,4,29,0,0), Boolean.TRUE),
				new Dia(LocalDateTime.of(2020,4,30,0,0), Boolean.TRUE),
				new Dia(LocalDateTime.of(2020,5,6,0,0), Boolean.FALSE),
				new Dia(LocalDateTime.of(2020,5,7,0,0), Boolean.TRUE)
			));
	
	public static List<Dia> listaDia = 
		new ArrayList<Dia>(Arrays.asList(
			new Dia(LocalDateTime.of(2020,4,1,0,0), Boolean.TRUE), 
			new Dia(LocalDateTime.of(2020,4,2,0,0), Boolean.FALSE),
			new Dia(LocalDateTime.of(2020,4,3,0,0), Boolean.FALSE),
			new Dia(LocalDateTime.of(2020,4,8,0,0), Boolean.TRUE),
			new Dia(LocalDateTime.of(2020,4,9,0,0), Boolean.TRUE),
			new Dia(LocalDateTime.of(2020,4,12,0,0), Boolean.TRUE),
			new Dia(LocalDateTime.of(2020,4,15,0,0), Boolean.FALSE),
			new Dia(LocalDateTime.of(2020,4,16,0,0), Boolean.TRUE),
			new Dia(LocalDateTime.of(2020,4,18,0,0), Boolean.TRUE),
			new Dia(LocalDateTime.of(2020,4,29,0,0), Boolean.TRUE),
			new Dia(LocalDateTime.of(2020,4,30,0,0), Boolean.TRUE),
			new Dia(LocalDateTime.of(2020,5,6,0,0), Boolean.FALSE),
			new Dia(LocalDateTime.of(2020,5,7,0,0), Boolean.TRUE)
		));
}

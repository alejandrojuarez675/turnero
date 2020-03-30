package com.sanatorio.espanol.backend.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sanatorio.espanol.backend.dto.Dia;

@Service
public class DiaService {
	
	public List<Dia> getListaDia() {
		return listaDia;
	}
	
	public static String pattern = "yyyy-MM-dd";
	public static SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

	public static List<Dia> listaDia = 
		new ArrayList<Dia>(Arrays.asList(
			new Dia(new GregorianCalendar(2020,4,1).getTime(), Boolean.TRUE), 
			new Dia(new GregorianCalendar(2020,4,2).getTime(), Boolean.FALSE),
			new Dia(new GregorianCalendar(2020,4,8).getTime(), Boolean.TRUE),
			new Dia(new GregorianCalendar(2020,4,9).getTime(), Boolean.TRUE),
			new Dia(new GregorianCalendar(2020,4,15).getTime(), Boolean.FALSE),
			new Dia(new GregorianCalendar(2020,4,16).getTime(), Boolean.TRUE),
			new Dia(new GregorianCalendar(2020,4,29).getTime(), Boolean.TRUE),
			new Dia(new GregorianCalendar(2020,4,30).getTime(), Boolean.TRUE),
			new Dia(new GregorianCalendar(2020,5,6).getTime(), Boolean.FALSE),
			new Dia(new GregorianCalendar(2020,5,7).getTime(), Boolean.TRUE)
		));
}

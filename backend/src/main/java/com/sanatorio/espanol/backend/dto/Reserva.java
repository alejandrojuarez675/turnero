package com.sanatorio.espanol.backend.dto;

import java.util.Date;

public class Reserva {

	Integer codigo;
	Date vencimiento;
	
	public Reserva(Integer codigo, Date vencimiento) {
		super();
		this.codigo = codigo;
		this.vencimiento = vencimiento;
	}

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	public Date getVencimiento() {
		return vencimiento;
	}

	public void setVencimiento(Date vencimiento) {
		this.vencimiento = vencimiento;
	}
	
}

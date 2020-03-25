package com.sanatorio.espanol.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanatorio.espanol.backend.dto.PacienteDTO;
import com.sanatorio.espanol.backend.dto.UsuarioDTO;

@RestController
public class LoginController {

	@PostMapping
    @RequestMapping("/login")
    public PacienteDTO login(@RequestBody UsuarioDTO userDTO) {
		
		if (userDTO.getUsuario() != null && !userDTO.equals(userDTO.getPassword())) {
			
			PacienteDTO pacienteDTO = new PacienteDTO();
			pacienteDTO.setApellido("Brumatti");
			pacienteDTO.setNombre("patiti");
			pacienteDTO.setObraSocial("OSDE 450");
			pacienteDTO.setId(1L);
	        return pacienteDTO;
		}
		return new PacienteDTO();
    }

	
}

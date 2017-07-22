package com.unibrasil.sca.apigateway;

import org.springframework.security.core.GrantedAuthority;

public class Papel implements GrantedAuthority {
	
	private static final long serialVersionUID = 1L;
	private String nome;

	@Override
	public String getAuthority() {
		return nome;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

}

package com.unibrasil.sca.apigateway;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class Erro404 extends RuntimeException {

	private static final long serialVersionUID = 1L;

}

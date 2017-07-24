package com.unibrasil.sca.apigateway;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AlunoController {
	
	@RequestMapping("/aluno")
	public Object getInfoAlunoLogado() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth.isAuthenticated()) {
			return auth.getPrincipal();
		}
		return null;
	}

}

package com.unibrasil.sca.apigateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@EnableDiscoveryClient
public class DisciplinaController {
	@LoadBalanced    // Make sure to create the load-balanced template
    @Autowired
    private RestTemplate restTemplate;

	@RequestMapping("/disciplinas")
	public String getDisciplinas() {
		String disciplinas = restTemplate.getForObject("http://CURSOS", String.class);
		if (disciplinas == null) {
			throw new Erro404();
		}
		return disciplinas;
	}
}

package com.unibrasil.sca.apigateway;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@EnableWebSecurity
@EnableZuulProxy
@EnableEurekaClient
public class ApigatewayApplication extends WebSecurityConfigurerAdapter {

	@Autowired
	private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

	@Autowired
	private MySavedRequestAwareAuthenticationSuccessHandler authenticationSuccessHandler;

	@Autowired
	private DataSource dataSource;

	public static void main(String[] args) {
		SpringApplication.run(ApigatewayApplication.class, args);
	}

	@LoadBalanced // Make sure to create the load-balanced template
	@Bean
	RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowCredentials(true).allowedHeaders("*").allowedMethods("*")
						.allowedOrigins("*");
			}
		};
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.httpBasic()
		.and()
		.cors()
		.and()
		.csrf().disable().exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint)
		.and()
		.authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
		.and()
		.authorizeRequests().antMatchers("/matricula/**").hasRole("ALUNO")
		.and()
		.formLogin().loginProcessingUrl("/api/login").successHandler(authenticationSuccessHandler).failureHandler(new SimpleUrlAuthenticationFailureHandler())
		.and()
		.logout();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.jdbcAuthentication()
				.dataSource(dataSource)
				.usersByUsernameQuery(
						"select username,password, enabled from users where username=?")
				.authoritiesByUsernameQuery(
						"select username, role from user_roles where username=?");

	}

	@Bean
	public MySavedRequestAwareAuthenticationSuccessHandler mySuccessHandler() {
		return new MySavedRequestAwareAuthenticationSuccessHandler();
	}
	
	@Bean(name = "dataSource")
	public DriverManagerDataSource dataSource() {
		DriverManagerDataSource driverManagerDataSource = new DriverManagerDataSource();
		driverManagerDataSource.setDriverClassName("com.mysql.jdbc.Driver");
		driverManagerDataSource.setUrl("jdbc:mysql://localhost:3306/poc");
		driverManagerDataSource.setUsername("root");
		driverManagerDataSource.setPassword("root");
		return driverManagerDataSource;

	}

}

package tn.esprit.forum.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SimpleCorsFilter implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // Autoriser les requêtes de tous les domaines
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Autoriser certaines méthodes HTTP
                .allowedHeaders("*"); // Autoriser tous les en-têtes
    }
}
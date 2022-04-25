package fr.univlyon1.m1if13.users.utils;

import fr.univlyon1.m1if13.users.model.UserDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public UserDao users() {
        return new UserDao();
    }
}

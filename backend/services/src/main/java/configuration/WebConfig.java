package configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * Created by Влад on 27.03.2017.
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "currency,user,city")
public class WebConfig  {
}

package configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * Created by Влад on 27.03.2017.
 */
@Configuration
@ComponentScan(basePackages="beans,dao,currency,user,city,fill")
public class RootConfig {
}

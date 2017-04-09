package configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Влад on 27.03.2017.
 */
@Configuration
@ComponentScan(basePackages= "beans,dao,currency,user,city,fill,i18n,mark,poster,model,file")
public class RootConfig {
}

package i18n;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Влад on 05.04.2017.
 */
@Configuration
public class ConfigBundle {
    @Bean
    public SerializableResourceBundleMessageSource messageSource() {
        SerializableResourceBundleMessageSource messageSource = new SerializableResourceBundleMessageSource();
        messageSource.setBasename("classpath:/project");
        messageSource.setDefaultEncoding("Cp1251");
        return messageSource;
    }
}

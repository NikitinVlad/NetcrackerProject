package i18n;

/**
 * Created by Влад on 05.04.2017.
 */

import dto.Lang;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Properties;

@RestController
public class LocaleController {

    @Autowired
    SerializableResourceBundleMessageSource messageBundle;

    @RequestMapping(value = "/messageBundle", produces = "application/json", method = RequestMethod.POST)
    @ResponseBody
    public Properties list(@RequestBody Lang lang) {
        System.out.println(lang.getLang());
        return messageBundle.getAllProperties(new Locale(lang.getLang()));
    }
}

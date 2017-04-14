package city;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/**
 * Created by Влад on 02.04.2017.
 */
@RestController
public class CityController {
    @Autowired
    CityServiceImpl cityService;

    @RequestMapping(value = "/getAllCities", produces = "application/json", method = RequestMethod.GET)
    public List getAllCities() {
        return cityService.getAllCities();
    }

    @RequestMapping(value = "/getRangeCities", produces = "application/json", method = RequestMethod.POST)
    public List getRangeCities(@RequestBody Object[] mas) {
        return cityService.getRangeCities((Integer) mas[0], (Integer) mas[1], (String) mas[2]);
    }

    @RequestMapping(value = "/getCitiesSize", produces = "application/json", method = RequestMethod.GET)
    public int getCitiesSize() {
        return cityService.getCitiesSize();
    }
}
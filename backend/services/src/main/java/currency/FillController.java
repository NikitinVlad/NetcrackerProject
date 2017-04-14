package currency;

/**
 * Контроллер и его методы  предназначены для работы с пакетом FullDB из модуля persistence и самим модулем. Пакет будет удален, когда станет ненужным
 */

import dao.CityDAO;
import entity.City;
import fill.FillDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;


@RestController
public class FillController {
    @Autowired
    FillDB fillDB;
    @Autowired
    CityDAO cityDAO;

    @RequestMapping(value = "/fillCity", produces = "application/json", method = RequestMethod.GET)
    public String fillCity() throws IOException {
        List<City> list = fillDB.fillCities();
        for (int i = 0; i < list.size(); i++) {
            cityDAO.create(list.get(i));
        }
        return "OK";
    }

    @RequestMapping(value = "/fillAuto", produces = "application/json", method = RequestMethod.GET)
    public String fillAuto() throws IOException {
        fillDB.fillAuto();
        return "OK";
    }
}


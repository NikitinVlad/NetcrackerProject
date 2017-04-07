package city;

import dao.CityDAO;
import entity.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Влад on 02.04.2017.
 */
@Service
public class CityServiceImpl implements CityService {
    @Autowired
    CityDAO cityDAO;
    public List getAllCities() {
        return cityDAO.getAll();
    }

    public List getRangeCities(int from,int to,String orderField) {
        return cityDAO.getRange(from,to,orderField);
    }

    public int getCitiesSize() {
        return cityDAO.getSize();
    }

    public City findCity(long id) {
       return cityDAO.findByID(id);
    }
    public City findCity(String name) {
        return cityDAO.findByField("name",name);
    }

    public long createCity(City city) {
        return cityDAO.create(city);
    }
}

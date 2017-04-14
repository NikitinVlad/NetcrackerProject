package city;

import entity.City;

import java.util.List;

/**
 * Created by Влад on 02.04.2017.
 */
public interface CityService {
    List getAllCities();

    List getRangeCities(int from, int to, String orderField);

    int getCitiesSize();

    City findCity(long id);

    City findCity(String name);

    long createCity(City city);
}

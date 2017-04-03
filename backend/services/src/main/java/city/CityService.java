package city;

import java.util.List;

/**
 * Created by Влад on 02.04.2017.
 */
public interface CityService {
    List getAllCities();
    List getRangeCities(int from,int to,String orderField);
    int getCitiesSize();
}

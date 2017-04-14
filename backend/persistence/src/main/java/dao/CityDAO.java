package dao;

import entity.City;
import org.springframework.stereotype.Repository;

/**
 * Created by Влад on 31.03.2017.
 */
@Repository
public class CityDAO extends BaseDAO<City> {
    public CityDAO() {
        super(City.class);
    }
}

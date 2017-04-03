package dao;

import entity.City;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

/**
 * Created by Влад on 31.03.2017.
 */
@Repository
@Lazy
public class CityDAO extends BaseDAO<City> {
    public CityDAO(){
        super(City.class);
    }
}

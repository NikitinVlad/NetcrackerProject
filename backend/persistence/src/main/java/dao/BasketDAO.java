package dao;

import entity.Basket;
import org.springframework.stereotype.Repository;

/**
 * Created by Влад on 31.03.2017.
 */
@Repository
public class BasketDAO extends BaseDAO<Basket> {
    public BasketDAO() {
        super(Basket.class);
    }
}

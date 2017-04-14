package dao;

import entity.Poster;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Created by Влад on 31.03.2017.
 */
@Repository
public class PosterDAO extends BaseDAO<Poster> {
    public PosterDAO() {
        super(Poster.class);
    }

    public List getRangedPosters(int from, int to, String orderField, long idUser){
        logger.info("Get ranged posters");
        Criteria criteria = getCurrentSession().createCriteria(Poster.class);
        criteria.createAlias("user","us");
        criteria.add(Restrictions.eq("us.id",idUser));
        criteria.addOrder(Order.desc(orderField));
        criteria.setFirstResult(from - 1);
        criteria.setMaxResults(to - from + 1);
        return criteria.list();
    }

}

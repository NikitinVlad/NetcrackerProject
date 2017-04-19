package dao;

import entity.User;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Влад on 31.03.2017.
 */
@Repository
public class UserDAO extends BaseDAO<User> {
    public UserDAO() {
        super(User.class);
    }

    public long ifExist(String login, String pass) {
        logger.info("Check user if exist");
        Criteria criteria = getCurrentSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("login", login)).add(Restrictions.eq("pass", pass)).uniqueResult();
        List<User> list = criteria.list();
        if (list.size() > 0) {
            return list.get(0).getId();
        } else return 0L;
    }

    public int getUsersSize(){
        logger.info("Get users size");
        Criteria criteria=getCurrentSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("role","ROLE_USER"));
        return criteria.list().size();
    }

    public List getRangeUsers(int from,int to){
        logger.info("Get ranged users");
        Criteria criteria=getCurrentSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("role","ROLE_USER")).addOrder(Order.asc("login")).setFirstResult(from-1).setMaxResults(to-from+1);
        return criteria.list();
    }
}

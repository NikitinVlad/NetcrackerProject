package dao;

import entity.User;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Влад on 31.03.2017.
 */
@Repository
@Lazy
public class UserDAO extends BaseDAO<User>{
    public UserDAO(){
        super(User.class);
    }

    public long ifExist(String login, String pass){
        Criteria criteria=getCurrentSession().createCriteria(User.class);
        criteria.add(Restrictions.eq("login",login)).add(Restrictions.eq("pass",pass)).uniqueResult();
        List<User> list=criteria.list();
        if(list.size()>0){
            return list.get(0).getId();
        }
        else return 0L;
    }
}

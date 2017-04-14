package dao;

import entity.BaseEntity;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Created by Влад on 23.03.2017.
 */
@Repository
@Transactional
public abstract class BaseDAO<T extends BaseEntity> {
    @Autowired
    SessionFactory sessionFactory;

    private final Class<T> entityClass;

    public BaseDAO(Class<T> entityClass) {
        this.entityClass = entityClass;
    }


    public long create(T entity) {
        try {
            getCurrentSession().save(entity);
            return entity.getId();
        } catch (DataIntegrityViolationException e) {
            e.getMessage();
        } catch (ConstraintViolationException e) {
            e.getMessage();
            getCurrentSession().clear();
        } catch (Exception e) {
            e.getMessage();
            getCurrentSession().clear();
        }
        return 0L;
    }

    @Transactional(readOnly = true)
    public List getAll() {
        Criteria criteria = getCurrentSession().createCriteria(entityClass);
        return criteria.list();
    }

    @Transactional(readOnly = true)
    public List getRange(int from, int to, String orderField) {
        Criteria criteria = getCurrentSession().createCriteria(entityClass);
        criteria.addOrder(Order.desc(orderField));
        criteria.setFirstResult(from - 1);
        criteria.setMaxResults(to - from + 1);
        return criteria.list();
    }


    public long update(T entity) {
        try {
            getCurrentSession().update(entity);
            return entity.getId();
        } catch (DataIntegrityViolationException e) {
            e.getMessage();
        } catch (Exception e) {
            getCurrentSession().clear();
        }
        return 0L;
    }

    public long delete(T entity) {
        try {
            long id = entity.getId();
            getCurrentSession().delete(entity);
            return id;
        } catch (Exception e) {
            getCurrentSession().clear();
        }
        return 0L;
    }

    public long delete(long id) {
        T entity = findByID(id);
        getCurrentSession().delete(entity);
        return id;
    }

    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    public T findByID(long id) {
        Criteria criteria = getCurrentSession().createCriteria(entityClass);
        T ent = (T) criteria.add(Restrictions.eq("id", id)).uniqueResult();
        return ent;
    }

    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    public T findByField(String field, Object value) {
        Criteria criteria = getCurrentSession().createCriteria(entityClass);
        return (T) criteria.add(Restrictions.eq(field, value)).uniqueResult();
    }

    @Transactional(readOnly = true)
    public int getSize() {
        return getAll().size();
    }


    //    protected DetachedCriteria createCriteria(){
//        return DetachedCriteria.forClass(entityClass);
//
//    }
    protected Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }

}

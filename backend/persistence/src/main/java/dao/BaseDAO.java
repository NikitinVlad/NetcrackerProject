package dao;

import entity.BaseEntity;
import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



@Repository
@Transactional
public abstract class BaseDAO<T extends BaseEntity> {
    @Autowired
    SessionFactory sessionFactory;

    protected final Logger logger;

    private final Class<T> entityClass;

    public BaseDAO(Class<T> entityClass) {
        this.entityClass = entityClass;
        this.logger=Logger.getLogger(entityClass);
    }


    public long create(T entity) {
        logger.info("Create entity");
        try {
            getCurrentSession().save(entity);
            return entity.getId();
        } catch (DataIntegrityViolationException e) {
            logger.error(e.getMessage());
        } catch (ConstraintViolationException e) {
            logger.error(e.getMessage());
            getCurrentSession().clear();
        } catch (Exception e) {
            logger.error(e.getMessage());
            getCurrentSession().clear();
        }
        return 0L;
    }

    @Transactional(readOnly = true)
    public List getAll() {
        logger.info("Get list of entities");
        Criteria criteria = getCurrentSession().createCriteria(entityClass);
        return criteria.list();
    }

    @Transactional(readOnly = true)
    public List getRange(int from, int to, String orderField) {
        logger.info("Get range of entities");
        Criteria criteria = getCurrentSession().createCriteria(entityClass);
        criteria.addOrder(Order.desc(orderField));
        criteria.setFirstResult(from - 1);
        criteria.setMaxResults(to - from + 1);
        return criteria.list();
    }


    public long update(T entity) {
        logger.info("Update entity");
        try {
            getCurrentSession().update(entity);
            return entity.getId();
        } catch (DataIntegrityViolationException e) {
            logger.error(e.getMessage());
        } catch (Exception e) {
            logger.error(e.getMessage());
            getCurrentSession().clear();
        }
        return 0L;
    }

    public long delete(T entity) {
        logger.info("Delete enity entity by entity");
        try {
            long id = entity.getId();
            getCurrentSession().delete(entity);
            return id;
        } catch (Exception e) {
            logger.error(e.getMessage());
            getCurrentSession().clear();
        }
        return 0L;
    }

    public long delete(long id) {
        logger.info("Delete entity by ID");
        T entity = findByID(id);
        getCurrentSession().delete(entity);
        return id;
    }

    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    public T findByID(long id) {
        logger.info("Find entity by ID");
        Criteria criteria = getCurrentSession().createCriteria(entityClass);
        T ent = (T) criteria.add(Restrictions.eq("id", id)).uniqueResult();
        return ent;
    }

    @Transactional(readOnly = true)
    @SuppressWarnings("unchecked")
    public T findByField(String field, Object value) {
        logger.info("Find entity by field");
        Criteria criteria = getCurrentSession().createCriteria(entityClass);
        return (T) criteria.add(Restrictions.eq(field, value)).uniqueResult();
    }

    @Transactional(readOnly = true)
    public int getSize() {
        logger.info("Get size of entities");
        return getAll().size();
    }

    public List findByCriteria(DetachedCriteria detachedCriteria){
        return detachedCriteria.getExecutableCriteria(getCurrentSession()).list();
    }


    protected Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }

}

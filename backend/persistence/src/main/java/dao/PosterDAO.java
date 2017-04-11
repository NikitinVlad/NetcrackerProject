package dao;

import entity.Poster;
import javafx.geometry.Pos;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Created by Влад on 31.03.2017.
 */
@Repository
public class PosterDAO extends BaseDAO<Poster>{
    public PosterDAO(){
        super(Poster.class);
    }

}

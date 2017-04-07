package dao;

import entity.Basket;
import entity.Mark;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

/**
 * Created by Влад on 31.03.2017.
 */
@Repository
public class MarkDAO extends BaseDAO<Mark> {
    public MarkDAO(){
        super(Mark.class);
    }
}

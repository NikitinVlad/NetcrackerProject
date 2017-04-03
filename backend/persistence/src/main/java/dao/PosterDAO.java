package dao;

import entity.Poster;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;


/**
 * Created by Влад on 31.03.2017.
 */
@Repository
@Lazy
public class PosterDAO extends BaseDAO<Poster>{
    public PosterDAO(){
        super(Poster.class);
    }
}

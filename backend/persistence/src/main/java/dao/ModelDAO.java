package dao;

import entity.Model;
import org.springframework.stereotype.Repository;

/**
 * Created by Влад on 31.03.2017.
 */
@Repository
public class ModelDAO extends BaseDAO<Model> {
    public ModelDAO() {
        super(Model.class);
    }
}

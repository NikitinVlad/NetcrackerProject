package model;


import dao.ModelDAO;
import entity.Model;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Влад on 08.04.2017.
 */
@Service
public class ModelServiceImpl implements ModelService {
    private Logger logger=Logger.getLogger(ModelServiceImpl.class);
    @Autowired
    ModelDAO modelDAO;

    public Model findModel(long id) {
        logger.info("Find model by ID");
        return modelDAO.findByID(id);
    }
}

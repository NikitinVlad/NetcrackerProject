package model;


import dao.MarkDAO;
import dao.ModelDAO;
import entity.Mark;
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

    @Autowired
    MarkDAO markDAO;


    public Model findModel(long id) {
        logger.info("Find model by ID");
        return modelDAO.findByID(id);
    }


    public long addModel(Model model) {
        logger.info("Add model");
        Model check=modelDAO.findByField("name",model.getName());
        if(check==null) {
            Mark mark = markDAO.findByID(model.getId());
            Model nModel = new Model(model.getName(), mark);
            return modelDAO.create(nModel);
        }
        return 0L;
    }
}

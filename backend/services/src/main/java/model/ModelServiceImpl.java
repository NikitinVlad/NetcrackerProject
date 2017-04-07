package model;


import dao.ModelDAO;
import entity.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Влад on 08.04.2017.
 */
@Service
public class ModelServiceImpl implements ModelService {
    @Autowired
    ModelDAO modelDAO;
    public Model findModel(long id) {
       return modelDAO.findByID(id);
    }
}

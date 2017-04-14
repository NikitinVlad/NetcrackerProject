package mark;

import dao.MarkDAO;
import entity.Mark;
import entity.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Влад on 07.04.2017.
 */
@Service
public class MarkServiceImpl implements MarkService {
    @Autowired
    MarkDAO markDAO;

    public List getAllMarks() {
        return markDAO.getAll();
    }

    public List getMarkModels(long id) {
        Mark mark = markDAO.findByID(id);
        List<Model> models = mark.getModels();
        models.sort((m1, m2) -> m1.getName().compareTo(m2.getName()));
        return models;
    }
}

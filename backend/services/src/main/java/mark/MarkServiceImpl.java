package mark;

import dao.MarkDAO;
import entity.Mark;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Влад on 07.04.2017.
 */
@Service
@Transactional
public class MarkServiceImpl implements MarkService {
    @Autowired
    MarkDAO markDAO;

    public List getAllMarks() {
        return markDAO.getAll();
    }
    @Transactional
    public List getMarkModels(long id) {
        Mark mark=markDAO.findByID(id);
        return mark.getModels();
    }
}

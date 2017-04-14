package fill;

import dao.MarkDAO;
import dao.ModelDAO;
import entity.City;
import entity.Mark;
import entity.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Пакет и методы классов предназначены для заполнения бд тестовыми данными из файлов. Пакет будет удален, когда станет ненужным
 */
@Service
public class FillDB {
    @Autowired
    ModelDAO modelDAO;
    @Autowired
    MarkDAO markDAO;

    List<City> entities = new ArrayList();
    List<Mark> marks = new ArrayList();
    List<Model> models = new ArrayList();
    MyFile myFile = new MyFile();


    public List<City> fillCities() throws IOException {
        List list = new ArrayList();
        list = myFile.readInput("cities");
        for (int i = 0; i < list.size(); i++) {
            City city = new City();
            city.setName((String) list.get(i));
            entities.add(city);
        }
        return entities;
    }

    public void fillAuto() throws IOException {
        List list = new ArrayList();
        list = myFile.readInput("marks");
        boolean flag = false;
        for (int i = 0; i < list.size(); i++) {
            Mark mark = new Mark();
            mark.setName((String) list.get(i));
            long a = markDAO.create(mark);
            ++i;
            if (a != 0L) {
                for (; i < list.size() && !list.get(i).equals(""); i++) {
                    Model model = new Model();
                    model.setName((String) list.get(i));
                    model.setMark(mark);
                    mark.getModels().add(model);
                    models.add(model);
                }
            }
        }
        for (int i = 0; i < models.size(); i++) {
            modelDAO.create(models.get(i));
        }
    }
//    public void clearCities(){
//        clear("delete from City");
//    }
//    public void clearAuto(){
//        clear("delete from Model");
//        clear("delete from Mark");
//    }

}

class MyFile {
    public List readInput(String filename) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream("E:/" + filename + ".txt"), "Cp1251"));
        String line;
        List<String> lines = new ArrayList<String>();
        while ((line = reader.readLine()) != null) {
            lines.add(line);
        }
        return lines;
    }
}



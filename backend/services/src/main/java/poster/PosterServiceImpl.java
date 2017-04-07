package poster;

import city.CityService;
import dao.ModelDAO;
import dao.PosterDAO;
import dto.AddInfo;
import dto.NewPoster;
import entity.*;
import mark.MarkService;
import model.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import user.UserService;

import java.util.Date;


/**
 * Created by Влад on 07.04.2017.
 */
@Service
public class PosterServiceImpl implements PosterService {
    CityService cityService;
    MarkService markService;
    ModelService modelService;
    UserService userService;

    @Autowired
    PosterDAO posterDAO;

    @Autowired
    public PosterServiceImpl(CityService cityService, MarkService markService, ModelService modelService, UserService userService) {
        this.cityService = cityService;
        this.markService = markService;
        this.modelService = modelService;
        this.userService = userService;
    }

    @SuppressWarnings("unchecked")
    public AddInfo getAddInfo() {
        AddInfo addInfo=new AddInfo();
        addInfo.setCities(cityService.getAllCities());
        addInfo.setMarks(markService.getAllMarks());
        return addInfo;
    }

    public long addNewPoster(NewPoster newPoster) {
        User user=userService.findUser(newPoster.getIdUser());
        Model model=modelService.findModel(newPoster.getIdModel());
        City city;
        if(!newPoster.getAnotherCity().equals("")){
            if(cityService.findCity(newPoster.getAnotherCity())==null){
                city=new City(newPoster.getAnotherCity());
                cityService.createCity(city);
            }
            else {
                city=cityService.findCity(newPoster.getAnotherCity());
            }
        }
        else {
            city=cityService.findCity(newPoster.getIdCity());
        }
        Poster poster=new Poster(user,model,city,Integer.parseInt(newPoster.getYear()),newPoster.getCurrency(),newPoster.getCost(),newPoster.getDescription(),new File());
        poster.setDate(new Date());
        return posterDAO.create(poster);
    }
}

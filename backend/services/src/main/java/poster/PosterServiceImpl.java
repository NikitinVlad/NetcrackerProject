package poster;

import city.CityService;
import currency.Currency;
import currency.ExchangeRates;
import dao.PosterDAO;
import dto.AddInfo;
import dto.CurrPoster;
import dto.NewPoster;
import entity.*;
import file.FileService;
import mark.MarkService;
import model.ModelService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import user.UserService;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * Created by Влад on 07.04.2017.
 */
@Service
public class PosterServiceImpl implements PosterService {
    CityService cityService;
    MarkService markService;
    ModelService modelService;
    UserService userService;
    FileService fileService;
    ExchangeRates exchangeRates;


    @Autowired
    PosterDAO posterDAO;

    @Autowired
    public PosterServiceImpl(CityService cityService, MarkService markService, ModelService modelService, UserService userService, FileService fileService,ExchangeRates exchangeRates) {
        this.cityService = cityService;
        this.markService = markService;
        this.modelService = modelService;
        this.userService = userService;
        this.fileService=fileService;
        this.exchangeRates=exchangeRates;
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

    public Poster findPoster(long id) {
        return posterDAO.findByID(id);
    }

    public CurrPoster getCurrentPoster(long id) throws IOException{
        Poster poster=findPoster(id);
        CurrPoster currentPoster=new CurrPoster();
        currentPoster.setId(poster.getId());
        currentPoster.setMarkName(poster.getModel().getMark().getName());
        currentPoster.setModelName(poster.getModel().getName());
        currentPoster.setYear(poster.getYear());
        currentPoster.setCity(poster.getCity().getName());
        currentPoster.setDescription(poster.getDescription());
        currentPoster.setTransmission(poster.getTransmision());
        currentPoster.setFuel(poster.getFuel());
        currentPoster.setDimension(poster.getDimension());
        currentPoster.setCurrency(poster.getCurrency());
        exchangeRates.getCourse();
        if(poster.getCurrency().equals("USD")){
            currentPoster.setPriceBlr((int)(Currency.UsdSale*poster.getPrice()));
            currentPoster.setPriceUsd(poster.getPrice());
        }
        if(poster.getCurrency().equals("BLR")){
            currentPoster.setPriceBlr(poster.getPrice());
            currentPoster.setPriceUsd((int)(poster.getPrice()/Currency.UsdBuy));
        }
        DateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
        currentPoster.setDate(StringUtils.substring(dateFormat.format(poster.getDate()),0,10));
        currentPoster.setUser(poster.getUser());
        if(poster.getFile().getFilename()!=null){
            currentPoster.setFile(fileService.getFile(poster.getFile().getFilename()));
        }
        return currentPoster;
    }

    public long savePoster(CurrPoster currPoster) {
        Poster poster=findPoster(currPoster.getId());
        poster.setDimension(currPoster.getDimension());
        poster.setFuel(currPoster.getFuel());
        poster.setTransmision(currPoster.getTransmission());
        if(!currPoster.getFileName().equals("")){
        poster.getFile().setFilename(currPoster.getFileName());
        }
        poster.setCurrency(currPoster.getCurrency());
        if(currPoster.getCurrency().equals("USD")){
            poster.setPrice(currPoster.getPriceUsd());
        }
        else
            poster.setPrice(currPoster.getPriceBlr());
        poster.setDescription(currPoster.getDescription());
        poster.setDate(new Date());
        return posterDAO.update(poster);
    }

    @SuppressWarnings("unchecked")
    public List getRangedPosters(int from, int to, String orderField, long idUser) throws IOException {
        List<Poster> posters=posterDAO.getRange(from,to,orderField);
        List<CurrPoster> currPosters=new ArrayList<CurrPoster>();
        for(int i=0;i<posters.size();i++){
            if(posters.get(i).getUser().getId()==idUser) {
                currPosters.add(getCurrentPoster(posters.get(i).getId()));
            }
        }
        return currPosters;
    }

    @SuppressWarnings("unchecked")
    public int getPostersSize(long idUser) {
        List<Poster> posters=posterDAO.getAll();
        int i=0;
        for(Poster pos:posters){
            if(pos.getUser().getId()==idUser){
                ++i;
            }
        }
        return i;
    }
}

package poster;

import city.CityService;
import currency.Currency;
import currency.ExchangeRates;
import dao.PosterDAO;
import dto.*;
import entity.*;
import file.FileService;
import javafx.geometry.Pos;
import mark.MarkService;
import model.ModelService;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
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
    private Logger logger=Logger.getLogger(PosterServiceImpl.class);

    CityService cityService;
    MarkService markService;
    ModelService modelService;
    UserService userService;
    FileService fileService;
    ExchangeRates exchangeRates;


    @Autowired
    PosterDAO posterDAO;

    @Autowired
    public PosterServiceImpl(CityService cityService, MarkService markService, ModelService modelService, UserService userService, FileService fileService, ExchangeRates exchangeRates) {
        this.cityService = cityService;
        this.markService = markService;
        this.modelService = modelService;
        this.userService = userService;
        this.fileService = fileService;
        this.exchangeRates = exchangeRates;
    }

    @SuppressWarnings("unchecked")
    public AddInfo getAddInfo() {
        logger.info("Get poster's info ");
        AddInfo addInfo = new AddInfo();
        addInfo.setCities(cityService.getAllCities());
        addInfo.setMarks(markService.getAllMarks());
        return addInfo;
    }

    public long addNewPoster(NewPoster newPoster) {
        logger.info("Add new poster");
        User user = userService.findUser(newPoster.getIdUser());
        Model model = modelService.findModel(newPoster.getIdModel());
        City city;
        if (!newPoster.getAnotherCity().equals("")) {
            if (cityService.findCity(newPoster.getAnotherCity()) == null) {
                city = new City(newPoster.getAnotherCity());
                cityService.createCity(city);
            } else {
                city = cityService.findCity(newPoster.getAnotherCity());
            }
        } else {
            city = cityService.findCity(newPoster.getIdCity());
        }
        Poster poster = new Poster(user, model, city, Integer.parseInt(newPoster.getYear()), newPoster.getCurrency(), newPoster.getCost(), newPoster.getDescription(), new File());
        poster.setDate(new Date());
        return posterDAO.create(poster);
    }

    public Poster findPoster(long id) {
        logger.info("Find poster by ID");
        return posterDAO.findByID(id);
    }

    public CurrPoster getCurrentPoster(long id) throws IOException {
        logger.info("Get current poster");
        Poster poster = findPoster(id);
        CurrPoster currentPoster = new CurrPoster();
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
        if (poster.getCurrency().equals("USD")) {
            currentPoster.setPriceBlr((int) (Currency.UsdBuy * poster.getPrice()));
            currentPoster.setPriceUsd(poster.getPrice());
        }
        if (poster.getCurrency().equals("BLR")) {
            currentPoster.setPriceBlr(poster.getPrice());
            currentPoster.setPriceUsd((int) (poster.getPrice() / Currency.UsdSale));
        }
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        currentPoster.setDate(StringUtils.substring(dateFormat.format(poster.getDate()), 0, 10));
        currentPoster.setUser(poster.getUser());
        if (poster.getFile().getFilename() != null) {
            currentPoster.setFile(fileService.getFile(poster.getFile().getFilename()));
        }
        return currentPoster;
    }

    public long savePoster(CurrPoster currPoster) {
        logger.info("Save poster");
        Poster poster = findPoster(currPoster.getId());
        poster.setDimension(currPoster.getDimension());
        poster.setFuel(currPoster.getFuel());
        poster.setTransmision(currPoster.getTransmission());
        if (!currPoster.getFileName().equals("")) {
            poster.getFile().setFilename(currPoster.getFileName());
        }
        poster.setCurrency(currPoster.getCurrency());
        if (currPoster.getCurrency().equals("USD")) {
            poster.setPrice(currPoster.getPriceUsd());
        } else
            poster.setPrice(currPoster.getPriceBlr());
        poster.setDescription(currPoster.getDescription());
        poster.setDate(new Date());
        return posterDAO.update(poster);
    }


    public long deletePoster(long id) {
        logger.info("Delete poster");
        Poster poster=posterDAO.findByID(id);
        if(poster.getFile().getFilename()!=null){
            fileService.deleteFile(id);
        }
        return posterDAO.delete(id);
    }

    @SuppressWarnings("unchecked")
    public List getRangedPosters(int from, int to, String orderField, long idUser) throws IOException {
        logger.info("Get ranged posters");
        List<Poster> posters = posterDAO.getRangedPosters(from,to,orderField,idUser);
        List<CurrPoster> currPosters = new ArrayList<CurrPoster>();
        for (int i = 0; i < posters.size(); i++) {
                currPosters.add(getCurrentPoster(posters.get(i).getId()));
        }
        return currPosters;
    }

    @SuppressWarnings("unchecked")
    public List getRangedAllPosters(int from, int to, String orderField) throws IOException {
        logger.info("Get ranged all posters");
        List<Poster> posters = posterDAO.getRange(from,to,orderField);
        List<CurrPoster> currPosters = new ArrayList<CurrPoster>();
        for (int i = 0; i < posters.size(); i++) {
            currPosters.add(getCurrentPoster(posters.get(i).getId()));
        }
        return currPosters;
    }

    @SuppressWarnings("unchecked")
    public int getPostersSize(long idUser) {
        logger.info("Get size of posters");
        List<Poster> posters = posterDAO.getAll();
        int i = 0;
        for (Poster pos : posters) {
            if (pos.getUser().getId() == idUser) {
                ++i;
            }
        }
        return i;
    }

    public int getAllPostersSize() {
        logger.info("Get size of all posters");
        return posterDAO.getSize();
    }

    public DetachedCriteria getQuery(FilterPosters filter){
        logger.info("Get DetachedCriteria query when filter posters");
        DetachedCriteria query = DetachedCriteria.forClass(Poster.class);
        query.add(Restrictions.isNull("basket"));
        if(!filter.getCity().equals("") ) {
            query.createAlias("city", "ct").add(Restrictions.eq("ct.name", filter.getCity()));
        }
        if(!filter.getModel().equals("") ) {
            query.createAlias("model", "md").add(Restrictions.eq("md.name", filter.getModel()));
        }
        if(filter.getYearFrom()!=0){
            query.add(Restrictions.gt("year",filter.getYearFrom()));
        }
        if(filter.getYearTo()!=0){
            query.add(Restrictions.lt("year",filter.getYearTo()));
        }
        if(!filter.getFuel().equals("")){
            query.add(Restrictions.eq("fuel",filter.getFuel()));
        }
        if(!filter.getTransmission().equals("")){
            query.add(Restrictions.eq("transmision",filter.getTransmission()));
        }
        if(!filter.getOrderField().equals("price")) {
            if(filter.getTypeOrder().equals("DESC")){
                query.addOrder(Order.desc(filter.getOrderField()));
            }
            else {
                query.addOrder(Order.asc(filter.getOrderField()));
            }
        }
        return query;
    }

    @SuppressWarnings("unchecked")
    public int getFilterPostersSize(FilterPosters filter) {
        logger.info("Get size of filter posters");
        List<Poster> posters=posterDAO.findByCriteria(getQuery(filter));
        posters=otherFilter(posters,filter);
        return posters.size();
    }

    public List otherFilter(List<Poster> posters, FilterPosters filter){
        logger.info("Other filter of posters");
        List<Poster> list=new ArrayList<>();
        if(!filter.getMark().equals("")){
            for (Poster poster:posters){
                String mark=poster.getModel().getMark().getName();
                if(mark.equals(filter.getMark())){
                    list.add(poster);
                }
            }
            posters.removeAll(posters);
            posters.addAll(list);
            list.removeAll(list);
        }
        if(filter.getPriceFrom()!=0){
            exchangeRates.getCourse();
            if(filter.getCurrency().equals("USD")){
                for (Poster poster:posters){
                    if(poster.getCurrency().equals("USD")){
                        if(poster.getPrice()>=filter.getPriceFrom()){
                            list.add(poster);
                        }
                    }
                    else{
                        double priceUSD=poster.getPrice()/Currency.UsdSale;
                        if(priceUSD>=filter.getPriceFrom()){
                            list.add(poster);
                        }
                    }
                }
            }
            else {
                for (Poster poster:posters){
                    if(poster.getCurrency().equals("USD")){
                        double priceBLR=poster.getPrice()*Currency.UsdBuy;
                        if(priceBLR>=filter.getPriceFrom()){
                            list.add(poster);
                        }
                    }
                    else{
                        if(poster.getPrice()>=filter.getPriceFrom()){
                            list.add(poster);
                        }
                    }
                }
            }
            posters.removeAll(posters);
            posters.addAll(list);
            list.removeAll(list);
        }
        if(filter.getPriceTo()!=0){
            exchangeRates.getCourse();
            if(filter.getCurrency().equals("USD")){
                for (Poster poster:posters){
                    if(poster.getCurrency().equals("USD")){
                        if(poster.getPrice()<=filter.getPriceTo()){
                            list.add(poster);
                        }
                    }
                    else{
                        double priceUSD=poster.getPrice()/Currency.UsdSale;
                        if(priceUSD<=filter.getPriceTo()){
                            list.add(poster);
                        }
                    }
                }
            }
            else {
                for (Poster poster:posters){
                    if(poster.getCurrency().equals("USD")){
                        double priceBLR=poster.getPrice()*Currency.UsdBuy;
                        if(priceBLR<=filter.getPriceTo()){
                            list.add(poster);
                        }
                    }
                    else{
                        if(poster.getPrice()<=filter.getPriceTo()){
                            list.add(poster);
                        }
                    }
                }
            }
            posters.removeAll(posters);
            posters.addAll(list);
            list.removeAll(list);
        }
        if(!filter.getDimensionFrom().equals("")){
            for(Poster poster:posters){
                if(!poster.getDimension().equals("") && poster.getDimension()!=null) {
                    if (Integer.parseInt(poster.getDimension()) >= Integer.parseInt(filter.getDimensionFrom())) {
                        list.add(poster);
                    }
                }
            }
            posters.removeAll(posters);
            posters.addAll(list);
            list.removeAll(list);
        }
        if(!filter.getDimensionTo().equals("")){
            for(Poster poster:posters){
                if(!poster.getDimension().equals("") && poster.getDimension()!=null) {
                    if (Integer.parseInt(poster.getDimension()) <= Integer.parseInt(filter.getDimensionTo())) {
                        list.add(poster);
                    }
                }
            }
            posters.removeAll(posters);
            posters.addAll(list);
            list.removeAll(list);
        }
        return posters;
    }

    @SuppressWarnings("unchecked")
    public List rangeFilterPosters(FilterPosters filter) throws IOException{
        logger.info("Get range of filter posters");
        DetachedCriteria query=getQuery(filter);
        List<Poster> posters = posterDAO.findByCriteria(query);
        posters=otherFilter(posters,filter);
        List<CurrPoster> currPosters=new ArrayList<>();
        for(int i=0;i<posters.size();i++){
            currPosters.add(getCurrentPoster(posters.get(i).getId()));
        }
        if(filter.getOrderField().equals("price")){
            if(filter.getTypeOrder().equals("DESC")){
                currPosters.sort((c1,c2)->(int) c1.getPriceUsd()-(int) c2.getPriceUsd());
            }
            else {
                currPosters.sort((c1,c2)->(int) c2.getPriceUsd()-(int) c1.getPriceUsd());
            }
        }
        currPosters=currPosters.subList(filter.getFrom()-1,filter.getTo());
        return currPosters;
    }

    public long addPosterToBasket(CurrPoster currPoster) {
        logger.info("Add poster to basket");
        User user=userService.findUser(currPoster.getUser().getId());
        Poster poster=posterDAO.findByID(currPoster.getId());
        poster.setBasket(user.getBasket());
        posterDAO.update(poster);
        return poster.getBasket().getId();
    }

    public List getRangePostersInBasket(int from,int to,long userID) throws IOException{
        logger.info("Get ranged posters in basket");
        List<Poster> posters=userService.findUser(userID).getBasket().getPosters();
        posters=posters.subList(from-1,to);
        List<CurrPoster> currPosters=new ArrayList<>();
        for(Poster poster:posters){
            currPosters.add(getCurrentPoster(poster.getId()));
        }
        return currPosters;
    }

    public BasketCount getBasketSize(long idUser) throws IOException{
        logger.info("Get basket size");
        List<Poster>  posters =userService.findUser(idUser).getBasket().getPosters();
        BasketCount basketCount=new BasketCount();
        basketCount.setSize(posters.size());
        for(Poster poster:posters){
            CurrPoster currPoster=getCurrentPoster(poster.getId());
            basketCount.setPriceUsd(basketCount.getPriceUsd()+currPoster.getPriceUsd());
            basketCount.setPriceBlr(basketCount.getPriceBlr()+currPoster.getPriceBlr());
        }
        return basketCount;
    }

    public long deleteFromBasket(long posterID){
        Poster poster=posterDAO.findByID(posterID);
        poster.setBasket(null);
        posterDAO.update(poster);
        return poster.getId();
    }
}

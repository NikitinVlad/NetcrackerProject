package poster;

import currency.ExchangeRates;
import dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

/**
 * Created by Влад on 07.04.2017.
 */
@RestController
public class PosterController {
    @Autowired
    PosterService posterService;

    @Autowired
    ExchangeRates exchangeRates;

    @RequestMapping(value = "/getAddInfo", produces = "application/json", method = RequestMethod.GET)
    public @ResponseBody AddInfo getAddInfo() {
        return posterService.getAddInfo();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "admin/getAddInfo", produces = "application/json", method = RequestMethod.GET)
    public @ResponseBody AddInfo getAddInfoAdmin() {
        return posterService.getAddInfo();
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/addNewPoster", produces = "application/json", method = RequestMethod.POST)
    public long addNewPoster(@RequestBody @Valid NewPoster newPoster, Errors errors) {
        if (errors.hasErrors()){
            return 0L;
        }
        return posterService.addNewPoster(newPoster);
    }

    @RequestMapping(value = "/getCurrentPoster", produces = "application/json", method = RequestMethod.POST)
    public CurrPoster getCurrentPoster(@RequestBody long id) throws IOException {
        return posterService.getCurrentPoster(id);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/savePoster", produces = "application/json", method = RequestMethod.POST)
    public long savePoster(@RequestBody CurrPoster currPoster) {
        return posterService.savePoster(currPoster);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/getRangePosters", produces = "application/json", method = RequestMethod.POST)
    public List getRangePosters(@RequestBody Object[] mas) throws IOException {
        int idUser = (Integer) mas[3];
        long d = idUser;
        return posterService.getRangedPosters((Integer) mas[0], (Integer) mas[1], (String) mas[2], d);
    }


    @RequestMapping(value = "/getRangeAllPosters", produces = "application/json", method = RequestMethod.POST)
    public List getRangeAllPosters(@RequestBody Object[] mas) throws IOException {
        return posterService.getRangedAllPosters((Integer) mas[0], (Integer) mas[1], (String) mas[2]);
    }

    @RequestMapping(value = "/getAllPostersSize", produces = "application/json", method = RequestMethod.GET)
    public int getAllPostersSize() {
        return posterService.getAllPostersSize();
    }

    @RequestMapping(value = "/getFilterPostersSize", produces = "application/json", method = RequestMethod.POST)
    public int getFilterPostersSize(@RequestBody FilterPosters filter) throws IOException {
        return posterService.getFilterPostersSize(filter);
    }

    @RequestMapping(value = "/rangeFilterPosters", produces = "application/json", method = RequestMethod.POST)
    public List rangeFilterPosters(@RequestBody FilterPosters filter) throws IOException {
        return posterService.rangeFilterPosters(filter);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/getPostersSize", produces = "application/json", method = RequestMethod.POST)
    public int getPostersSize(@RequestBody long id) {
        return posterService.getPostersSize(id);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/deletePoster", produces = "application/json", method = RequestMethod.POST)
    public long deletePoster(@RequestBody long id){
        return posterService.deletePoster(id);
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "addToBasket", produces = "application/json", method = RequestMethod.POST)
    public long addPosterToBasket(@RequestBody CurrPoster currPoster){
        return posterService.addPosterToBasket(currPoster);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "getRangePostersBasket", produces = "application/json", method = RequestMethod.POST)
    public List getRangePostersInBasket(@RequestBody Object[] mas) throws IOException{
        int idUser = (Integer) mas[2];
        long d = idUser;
        return posterService.getRangePostersInBasket((Integer) mas[0], (Integer) mas[1], d);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/getBasketSize", produces = "application/json", method = RequestMethod.POST)
    public BasketCount getBasketSize(@RequestBody long id) throws IOException{
        return posterService.getBasketSize(id);
    }

    @PreAuthorize("isAuthenticated()")
    @RequestMapping(value = "/deleteFromBasket", produces = "application/json", method = RequestMethod.POST)
    public long deleteFromBasket(@RequestBody long posterID){
        return posterService.deleteFromBasket(posterID);
    }

    @PreAuthorize("hasRole('USER')")
    @RequestMapping(value = "/buyCars", produces = "application/json", method = RequestMethod.POST)
    public long buyCars(@RequestBody long userID){
        return posterService.buyCars(userID);
    }
}

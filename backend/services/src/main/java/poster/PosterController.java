package poster;

import currency.ExchangeRates;
import dto.AddInfo;
import dto.CurrPoster;
import dto.NewPoster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @RequestMapping(value="/getAddInfo",produces="application/json",method = RequestMethod.GET)
    public @ResponseBody AddInfo getAddInfo() {
        return posterService.getAddInfo();
    }

    @RequestMapping(value="/addNewPoster",produces="application/json",method = RequestMethod.POST)
    public long addNewPoster(@RequestBody NewPoster newPoster)
    {
        return posterService.addNewPoster(newPoster);
    }

    @RequestMapping(value="/getCurrentPoster",produces="application/json",method = RequestMethod.POST)
    public CurrPoster addNewPoster(@RequestBody long id) throws IOException
    {
        return posterService.getCurrentPoster(id);
    }
    @RequestMapping(value="/savePoster",produces="application/json",method = RequestMethod.POST)
    public long savePoster(@RequestBody CurrPoster currPoster)
    {
        return posterService.savePoster(currPoster);
    }

    @RequestMapping(value = "/getRangePosters", produces = "application/json", method = RequestMethod.POST)
    public List getRangePosters(@RequestBody Object[] mas) throws IOException {
        int idUser=(Integer) mas[3];
        long d=idUser;
        return posterService.getRangedPosters((Integer)mas[0],(Integer) mas[1],(String) mas[2],d);
    }
    @RequestMapping(value = "/getPostersSize", produces = "application/json", method = RequestMethod.POST)
    public int getCitiesSize(@RequestBody long id) {
        return posterService.getPostersSize(id);
    }
}

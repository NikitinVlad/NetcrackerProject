package poster;

import currency.Currency;
import currency.ExchangeRates;
import dto.AddInfo;
import dto.NewPoster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

}

package currency;

/**
 * Created by Влад on 14.03.2017.
 */
import entity.Basket;
import entity.User;
import enums.Role;
import org.springframework.web.bind.annotation.*;


@RestController
public class CurrencyController {
    @RequestMapping(value="/course",produces="application/json",method = RequestMethod.GET)
    public @ResponseBody Currency getCourse() {
        ExchangeRates getCurr = new ExchangeRatesImpl();
        Currency currency = getCurr.getCourse();
        return currency;
    }
}

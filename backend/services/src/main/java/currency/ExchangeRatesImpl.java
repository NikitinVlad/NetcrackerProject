package currency;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Влад on 28.03.2017.
 */
@Service
public class ExchangeRatesImpl implements ExchangeRates {
    private Logger logger=Logger.getLogger(ExchangeRatesImpl.class);
    public void getCourse() {
        logger.info("GetCourse");
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String now = dateFormat.format(new Date());
        if (Currency.UsdBuy == 0 || !now.equals(dateFormat.format(Currency.date))) {
            try {
                System.out.println("there");
                DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
                DocumentBuilder db = dbf.newDocumentBuilder();
                Document doc = db.parse(new URL("https://belarusbank.by/dev/kursyValut").openStream());
                Element lib = doc.getDocumentElement();
                Element rate = (Element) lib.getElementsByTagName("rates").item(0);
                Element usd = (Element) rate.getElementsByTagName("USD").item(0);
                Element buy;
                Element sale;
                buy = (Element) usd.getElementsByTagName("buy").item(0);
                sale = (Element) usd.getElementsByTagName("sale").item(0);
                String usdBuy = buy.getTextContent();
                String usdSale = sale.getTextContent();
                Currency.UsdBuy = Double.parseDouble(usdBuy);
                Currency.UsdSale = Double.parseDouble(usdSale);
                Currency.date = new Date();
            } catch (Exception e) {
                logger.error(e.getMessage());
                e.printStackTrace();
            }
        }
    }
}

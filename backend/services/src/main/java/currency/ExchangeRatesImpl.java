package currency;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Влад on 28.03.2017.
 */
public class ExchangeRatesImpl implements ExchangeRates {
    public Currency getCourse() {
        try {
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
            Element eur=(Element)rate.getElementsByTagName("EUR").item(0);
            buy=(Element)eur.getElementsByTagName("buy").item(0);
            sale=(Element)eur.getElementsByTagName("sale").item(0);
            String eurBuy=buy.getTextContent();
            String eurSale=sale.getTextContent();
            Element rub=(Element)rate.getElementsByTagName("RUB").item(0);
            buy=(Element)rub.getElementsByTagName("buy").item(0);
            sale=(Element)rub.getElementsByTagName("sale").item(0);
            String rubBuy=buy.getTextContent();
            String rubSale=sale.getTextContent();
            return new Currency(usdBuy,usdSale,eurBuy,eurSale,rubBuy,rubSale);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}

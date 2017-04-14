package entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Влад on 27.03.2017.
 */
@Entity
public class Poster extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "id_basket")
    private Basket basket;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_city")
    private City city;

    @ManyToOne
    @JoinColumn(name = "id_model")
    private Model model;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_file")
    private File file;

    private double price;
    private String currency;

    private int year;
    private String fuel;
    private String dimension;
    private String transmision;
    private Date date;
    private String description;

    public Poster() {
    }

    public Poster(User user, Model model, City city, int year, String currency, double price, String description, File file) {
        this.user = user;
        this.city = city;
        this.model = model;
        this.file = file;
        this.price = price;
        this.currency = currency;
        this.year = year;
        this.description = description;
    }

    public Basket getBasket() {
        return basket;
    }

    public void setBasket(Basket basket) {
        this.basket = basket;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getFuel() {
        return fuel;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel;
    }

    public String getDimension() {
        return dimension;
    }

    public void setDimension(String dimension) {
        this.dimension = dimension;
    }

    public String getTransmision() {
        return transmision;
    }

    public void setTransmision(String transmision) {
        this.transmision = transmision;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

package entity;

import javafx.geometry.Pos;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Влад on 27.03.2017.
 */
@Entity
public class Poster extends BaseEntity{
    @ManyToOne
    @JoinColumn(name = "id_poster")
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

    private String year;
    private String fuel;
    private String dimension;
    private String transmision;
    private Date date;

    public Poster(){
    }

    public Poster(Basket basket, User user, City city, Model model, File file, double price, String currency, String year, String fuel, String dimension, String transmision, Date date) {
        this.basket = basket;
        this.user = user;
        this.city = city;
        this.model = model;
        this.file = file;
        this.price = price;
        this.currency = currency;
        this.year = year;
        this.fuel = fuel;
        this.dimension = dimension;
        this.transmision = transmision;
        this.date = date;
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

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
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
}

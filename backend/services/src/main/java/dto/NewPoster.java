package dto;


import javax.validation.constraints.*;

public class NewPoster {

    private long idUser;

    @Min(1)
    private long idModel;

    private long idCity;

    private String anotherCity;

    private String year;


    private String currency;

    @Min(1)
    @Max(999999)
    private double cost;

    private String description;

    public NewPoster() {
    }

    public NewPoster(long idUser, long idModel, long idCity, String anotherCity, String year, String currency, double cost, String description) {
        this.idUser = idUser;
        this.idModel = idModel;
        this.idCity = idCity;
        this.anotherCity = anotherCity;
        this.year = year;
        this.currency = currency;
        this.cost = cost;
        this.description = description;
    }

    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public long getIdModel() {
        return idModel;
    }

    public void setIdModel(long idModel) {
        this.idModel = idModel;
    }

    public long getIdCity() {
        return idCity;
    }

    public void setIdCity(long idCity) {
        this.idCity = idCity;
    }

    public String getAnotherCity() {
        return anotherCity;
    }

    public void setAnotherCity(String anotherCity) {
        this.anotherCity = anotherCity;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}

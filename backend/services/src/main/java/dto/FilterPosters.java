package dto;

public class FilterPosters {
    private String mark;
    private String model;
    private int yearFrom;
    private int yearTo;
    private String currency;
    private double priceFrom;
    private double priceTo;
    private String fuel;
    private String dimensionFrom;
    private String dimensionTo;
    private String transmission;
    private String city;
    private String orderField;
    private String typeOrder;
    private int from;
    private int to;
    public FilterPosters(){}

    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public int getTo() {
        return to;
    }

    public void setTo(int to) {
        this.to = to;
    }

    public String getOrderField() {
        return orderField;
    }

    public void setOrderField(String orderField) {
        this.orderField = orderField;
    }

    public String getTypeOrder() {
        return typeOrder;
    }

    public void setTypeOrder(String typeOrder) {
        this.typeOrder = typeOrder;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getYearFrom() {
        return yearFrom;
    }

    public void setYearFrom(int yearFrom) {
        this.yearFrom = yearFrom;
    }

    public int getYearTo() {
        return yearTo;
    }

    public void setYearTo(int yearTo) {
        this.yearTo = yearTo;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public double getPriceFrom() {
        return priceFrom;
    }

    public void setPriceFrom(double priceFrom) {
        this.priceFrom = priceFrom;
    }

    public double getPriceTo() {
        return priceTo;
    }

    public void setPriceTo(double priceTo) {
        this.priceTo = priceTo;
    }

    public String getFuel() {
        return fuel;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel;
    }

    public String getDimensionFrom() {
        return dimensionFrom;
    }

    public void setDimensionFrom(String dimensionFrom) {
        this.dimensionFrom = dimensionFrom;
    }

    public String getDimensionTo() {
        return dimensionTo;
    }

    public void setDimensionTo(String dimensionTo) {
        this.dimensionTo = dimensionTo;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}

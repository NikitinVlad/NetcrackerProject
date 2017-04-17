package dto;

public class BasketCount {
    private int size;
    private double priceUsd=0;
    private double priceBlr=0;
    public BasketCount(){}

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public double getPriceUsd() {
        return priceUsd;
    }

    public void setPriceUsd(double priceUsd) {
        this.priceUsd = priceUsd;
    }

    public double getPriceBlr() {
        return priceBlr;
    }

    public void setPriceBlr(double priceBlr) {
        this.priceBlr = priceBlr;
    }
}

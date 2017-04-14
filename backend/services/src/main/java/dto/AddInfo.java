package dto;

import entity.City;
import entity.Mark;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Влад on 07.04.2017.
 */
public class AddInfo {
    private List<City> cities = new ArrayList<City>();
    private List<Mark> marks = new ArrayList<Mark>();

    public AddInfo() {
    }

    public AddInfo(List<City> cities, List<Mark> marks) {
        this.cities = cities;
        this.marks = marks;
    }

    public List<City> getCities() {
        return cities;
    }

    public void setCities(List<City> cities) {
        this.cities = cities;
    }

    public List<Mark> getMarks() {
        return marks;
    }

    public void setMarks(List<Mark> marks) {
        this.marks = marks;
    }
}

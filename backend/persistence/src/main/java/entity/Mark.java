package entity;

import org.hibernate.annotations.*;
import org.hibernate.annotations.OrderBy;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Влад on 24.03.2017.
 */
@Entity
public class Mark extends BaseEntity{
    @Column(unique = true)
    private String name;
    @OneToMany(cascade = {CascadeType.ALL},mappedBy = "mark")
    @OrderBy(clause = "name DESC")
    private List<Model> models=new ArrayList<Model>();

    public Mark() {
    }

    public Mark(String name) {
        this.name = name;
    }

    public List<Model> getModels() {
        return models;
    }

    public void setModels(List<Model> models) {
        this.models = models;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.OrderBy;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Влад on 24.03.2017.
 */
@Entity
public class Mark extends BaseEntity {
    @Column(unique = true)
    private String name;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "mark")
    @Fetch(FetchMode.SELECT)
    @OrderBy(clause = "name DESC")
    @JsonIgnore
    private List<Model> models = new ArrayList<Model>();

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

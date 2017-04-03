package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Влад on 24.03.2017.
 */
@Entity
public class City extends BaseEntity {
    @Column(unique = true)
    private String name;

    @OneToMany(cascade = {CascadeType.ALL},mappedBy = "city")
    @JsonIgnore
    private List<Poster> posters=new ArrayList<Poster>();

    public City(){};

    public City(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Poster> getPosters() {
        return posters;
    }

    public void setPosters(List<Poster> posters) {
        this.posters = posters;
    }
}

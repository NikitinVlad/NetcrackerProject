package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Влад on 24.03.2017.
 */
@Entity
public class Basket extends BaseEntity {
    @OneToOne(mappedBy = "basket")
    @JsonIgnore
    private User user;

    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "basket")
    private List<Poster> posters = new ArrayList<Poster>();

    public Basket() {
    }

    public Basket(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Poster> getPosters() {
        return posters;
    }

    public void setPosters(List<Poster> posters) {
        this.posters = posters;
    }
}

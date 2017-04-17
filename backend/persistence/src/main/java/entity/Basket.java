package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
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

    @OneToMany(fetch = FetchType.EAGER,cascade = {CascadeType.ALL}, mappedBy = "basket")
    @Fetch(FetchMode.SELECT)
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

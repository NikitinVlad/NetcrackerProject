package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Влад on 23.03.2017.
 */
@Entity
public class User extends BaseEntity {
    private String name;
    @Column(unique = true)
    private String login;
    private String pass;
    private String email;
    private String role;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "basket_id")
    @JsonIgnore
    private Basket basket;

    @OneToMany(cascade = {CascadeType.ALL},mappedBy = "user")
    @JsonIgnore
    private List<Poster> posters=new ArrayList<Poster>();
    public User(){}

    public User(String login, String pass, String email, String role,Basket basket) {
        this.login = login;
        this.pass = pass;
        this.email = email;
        this.role = role;
        this.basket=basket;
    }

    public Basket getBasket() {
        return basket;
    }

    public void setBasket(Basket basket) {
        this.basket = basket;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String  getRole() {
        return role;
    }

    public void setRole(String  role) {
        this.role = role;
    }

    public List<Poster> getPosters() {
        return posters;
    }

    public void setPosters(List<Poster> posters) {
        this.posters = posters;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

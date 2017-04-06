package dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Влад on 04.04.2017.
 */
public class UserLogin {
    @NotNull
    @Size(min = 3,max = 15)
    private String login;

    @NotNull
    @Size(min = 4,max = 20)
    private String pass;

    public UserLogin(){}

    public UserLogin(String login, String pass) {
        this.login = login;
        this.pass = pass;
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
}

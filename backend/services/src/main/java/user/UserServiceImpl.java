package user;

import dao.UserDAO;
import dto.UserLogin;
import entity.Basket;
import entity.Poster;
import entity.User;
import enums.Role;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Влад on 31.03.2017.
 */
@Service
public class UserServiceImpl implements UserService {
    private Logger logger=Logger.getLogger(UserServiceImpl.class);

    @Autowired
    UserDAO userDAO;

    @Autowired
    AuthenticationManager authenticationManager;


    public long createUser(User user) {
        logger.info("Create user");
        user.setRole(Role.ROLE_USER.toString());
        user.setBasket(new Basket());
        long id = userDAO.create(user);
        return id;
    }

    public long deleteUser(long id) {
        long ans = userDAO.delete(id);
        return ans;
    }

    public User findUser(long id) {
        logger.info("Find user by ID");
        return userDAO.findByID(id);
    }

    public User findUser(String login) {
        logger.info("find user by field");
        return userDAO.findByField("login", login);
    }

    public long updateUser(User user) {
        return userDAO.update(user);
    }

    public User checkUser(String login, String pass) {
        logger.info("Check user if exist");
        long id = userDAO.ifExist(login, pass);
        if (id == 0L) {
            return new User();
        } else {
            auth(new UserLogin(login,pass));
            return userDAO.findByID(id);
        }
    }

    public List findAll() {
        return userDAO.getAll();
    }


    public void auth(UserLogin userLogin) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.getLogin(), userLogin.getPass()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
    }

}

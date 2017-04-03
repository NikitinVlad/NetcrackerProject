package user;

import dao.BasketDAO;
import dao.UserDAO;
import entity.Basket;
import entity.User;
import enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

/**
 * Created by Влад on 31.03.2017.
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDAO userDAO;


    public long createUser(User user) {
        user.setRole(Role.ROLE_USER.toString());
        user.setBasket(new Basket());
        long id=userDAO.create(user);
        return id;
    }

    public long deleteUser(long id) {
        long ans=userDAO.delete(id);
        return ans;
    }

    public User findUser(long id) {
        return userDAO.findByID(id);
    }

    public User findUser(String login) {
        return userDAO.findByField("login", login);
    }

    public long updateUser(User user) {
        return userDAO.update(user);
    }

    public User checkUser(String login, String pass) {
        long id=userDAO.ifExist(login,pass);
        if(id==0L){
            return new User();
        }
        else {
            return userDAO.findByID(id);
        }
    }

    public List findAll() {
       return userDAO.getAll();
    }
}

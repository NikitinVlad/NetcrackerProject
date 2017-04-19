package user;

import dto.UserLogin;
import entity.User;

import java.util.List;

/**
 * Created by Влад on 31.03.2017.
 */
public interface UserService {
    long createUser(User user);

    long deleteUser(long id);

    User findUser(long id);

    User findUser(String login);

    long updateUser(User user);

    User checkUser(String login, String pass);

    List findAll();

    void auth(UserLogin userLogin);

    int getUsersSize();

    List getRangeUsers(int from,int to);
}

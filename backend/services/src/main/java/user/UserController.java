package user;



import dto.UserLogin;
import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
public class UserController {
    @Autowired
    UserServiceImpl userService;

    @RequestMapping(value = "/createUser", produces = "application/json", method = RequestMethod.POST)
    public long createUser(@RequestBody @Valid User user, Errors errors) {
        if (errors.hasErrors()) {
            return 0L;
        }
        return userService.createUser(user);
    }

    @RequestMapping(value = "/findUsers", produces = "application/json", method = RequestMethod.GET)
    public @ResponseBody List findUsers() {List list = userService.findAll();
        return list;
    }

    @RequestMapping(value = "/findUserByID", produces = "application/json", method = RequestMethod.POST)
    public @ResponseBody User findUserByID(@RequestBody Long id) {
        return userService.findUser(id);
    }

    @RequestMapping(value = "/findUserByLogin", produces = "application/json", method = RequestMethod.POST)
    public @ResponseBody User findUserByLogin(@RequestBody String login) {
        return userService.findUser(login);
    }

    @RequestMapping(value = "/updateUser", produces = "application/json", method = RequestMethod.POST)
    public long updateUser(@RequestBody @Valid User user,Errors errors) {
        if(errors.hasErrors()){
            return 0L;
        }
        return userService.updateUser(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/deleteUser", produces = "application/json", method = RequestMethod.POST)
    public long deleteUser(@RequestBody Long id) {
        return userService.deleteUser(id);
    }

    @RequestMapping(value = "/checkUser", produces = "application/json", method = RequestMethod.POST)
    public User checkUser(@RequestBody @Valid UserLogin user, Errors errors) {
        if (errors.hasErrors()) {
            return new User();
        }
        return userService.checkUser(user.getLogin(), user.getPass());
    }

    @RequestMapping(value = "/getUsersSize", produces = "application/json", method = RequestMethod.GET)
    public int getUsersSize() {
        return userService.getUsersSize();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "admin/getUsersSize", produces = "application/json", method = RequestMethod.GET)
    public int getUsersSizeAdmin() {
        return userService.getUsersSize();
    }

    @RequestMapping(value = "/getRangeUsers", produces = "application/json", method = RequestMethod.POST)
    public List getRangeUsers(@RequestBody Object[] mas) {
        return userService.getRangeUsers((Integer)mas[0],(Integer) mas[1]);
    }
}

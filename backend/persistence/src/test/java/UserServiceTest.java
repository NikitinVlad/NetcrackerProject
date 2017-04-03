import beans.PersistenceConfig;
import dao.UserDAO;
import entity.Basket;
import entity.User;
import enums.Role;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import java.util.List;



@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(loader = AnnotationConfigContextLoader.class,classes = PersistenceConfig.class)
public class UserServiceTest {
    @Autowired
    UserDAO userDAO;


    @Before
    public void create(){
        User user=new User("dimas","12345","dima111@mail.ru",Role.ROLE_USER.toString(),new Basket());
        user.setName("Dima");
        Assert.assertNotEquals(0L,userDAO.create(user));
    }
    @Test
    public void readOrUpdate(){
        List users=userDAO.getAll();
        Assert.assertNotNull(users);
        User cur=new User();
        for(Object user:users){
            User current=(User)user;
            if(current.getLogin().equals("dimas")){
                cur=current;
            }
        }
        long lateId=cur.getId();
        cur.setPass("2345");
        Assert.assertEquals(lateId,userDAO.update(cur));
    }
    @After
    public void deleteUser(){
        User user=userDAO.findByField("login","dimas");
        Assert.assertNotNull(user);
        Assert.assertNotEquals(0L,userDAO.delete(user));
    }
}

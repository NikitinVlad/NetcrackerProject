package security;

import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import user.UserService;

import java.util.ArrayList;
import java.util.List;
@Service
public class SecurityUserDetailsService implements UserDetailsService {
    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(final String login) throws UsernameNotFoundException {
        User user=userService.findUser(login);
        List<GrantedAuthority> authorities=new ArrayList<>(1);
        authorities.add(new SimpleGrantedAuthority(user.getRole()));
        return new org.springframework.security.core.userdetails.User(user.getName(),user.getPass(),authorities);
    }
}

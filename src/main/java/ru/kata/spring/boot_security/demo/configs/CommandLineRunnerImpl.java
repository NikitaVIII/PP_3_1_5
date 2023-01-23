package ru.kata.spring.boot_security.demo.configs;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.HashSet;
import java.util.Set;


@Component
public class CommandLineRunnerImpl implements CommandLineRunner {

    private final UserService userService;
    private final RoleService roleService;

    public CommandLineRunnerImpl(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    private void createUsers() {
        Role userRole = new Role("ROLE_USER");
        Role adminRole = new Role("ROLE_ADMIN");
        roleService.saveRole(userRole);
        roleService.saveRole(adminRole);

        Set<Role> roles1 = new HashSet<>();
        Set<Role> roles2 = new HashSet<>();
        roles1.add(adminRole);
        roles2.add(userRole);
        User user1 = new User("FirstName", "LastName", (byte) 20, "email@mail.ru", roles1);
        user1.setPassword("admin");
        User user2 = new User("FirstName2", "LastName2", (byte) 25, "email2@mail.ru", roles2);
        user2.setPassword("user");
        userService.save(user1);
        userService.save(user2);
    }

    @Override
    public void run(String... args) throws Exception {
        //createUsers();
    }
}

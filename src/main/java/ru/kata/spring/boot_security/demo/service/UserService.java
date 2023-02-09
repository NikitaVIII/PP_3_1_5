package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    void save(User user);

    void removeUserById(Long id);

    User getUserById(Long id);

    List<User> getAllUsers();

    void updateUser(User user);

//    User getCurrentUser();
}

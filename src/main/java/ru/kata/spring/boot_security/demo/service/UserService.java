package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {

    Optional<User> findByUsername(String username);

    void add(User user);

    List<User> getAll();

    User getById(Long id);

    void update(Long id, User user);

    boolean delete(Long id);

    void updateUserDetails(Long id, String firstName, String lastName, int age, String username, String password, List<String> roles);
    void updateUserPassword(Long id, String newPassword);

}

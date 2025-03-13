package ru.kata.spring.boot_security.demo.service;

import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.RoleRepository;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.roleRepository = roleRepository;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Hibernate.initialize(user.getRoles());
        return user;
    }

    public void add(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Шифруем пароль перед сохранением

        if(user.getRoles() == null || user.getRoles().isEmpty()) {
            Role defaultRole =  roleRepository.findById(1L).orElseThrow(() -> new RuntimeException("Role not found"));
            user.setRoles(Set.of(defaultRole));
        }
        userRepository.save(user);
    }

    public void updateUserDetails(Long id, String firstName, String lastName, int age, String username, String password, List<String> roles) {

        User user = getById(id);
        if (user != null) {
            // Обновляем имя и фамилию
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setAge(age);

            // Если передан новый username, обновляем его
            if (username != null && !username.isEmpty()) {
                user.setUsername(username);
            }

            // Если передан новый пароль, шифруем и обновляем его
            if (password != null && !password.isEmpty()) {
                user.setPassword(passwordEncoder.encode(password));
            }

            // Обновляем роли
            Set<Role> updatedRoles = roles.stream()
                    .map(roleName -> new Role(roleName, roleName.equals("ADMIN") ? 2L : 1L))
                    .collect(Collectors.toSet());

            user.setRoles(updatedRoles);

            // Сохраняем изменения в базе данных
            userRepository.save(user);
        }
    }

    public List<User> getAll() {
        return userRepository.findAllWithRoles();
    }

    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void update(Long id, User user) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getPassword().equals(existingUser.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword())); // Шифруем только если пароль изменился
        }
        // Обновляем все данные пользователя
        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setAge(user.getAge());
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());  // Новый зашифрованный пароль, если он был изменен
        existingUser.setRoles(user.getRoles());  // Обновляем роли пользователя

        // Сохраняем обновленного пользователя
        userRepository.save(existingUser);
    }

    public boolean delete(Long id) {
        if(!userRepository.existsById(id)){
            return false;
        }
        userRepository.deleteById(id);
        return true;
    }

    public void updateUserPassword(Long id, String newPassword) {
        User user = getById(id);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(newPassword)); // Шифруем новый пароль
            userRepository.save(user);
        }
    }


}

package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAll();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        if(!userService.delete(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok("User deleted successfully");
    }

    @PostMapping("/users")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        System.out.println(user); // Печать данных для отладки
        userService.add(user);
        return ResponseEntity.ok("User " + user.getUsername() +  " added successfully");
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User user){
        try{
            userService.update(id, user);
            return ResponseEntity.ok("User " + user.getUsername() + " updated successfully");
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

}

//package ru.kata.spring.boot_security.demo.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import ru.kata.spring.boot_security.demo.model.User;
//import ru.kata.spring.boot_security.demo.service.UserService;
//
//import java.util.List;
//
//@Controller
//@RequestMapping("/admin")
//public class AdminController {
//
//    private final UserService userService;  //Используем интерфейс
//
//    @Autowired
//    public AdminController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping
//    public String adminPage(@AuthenticationPrincipal User user, Model model) {
//        model.addAttribute("user", user);
//        model.addAttribute("users", userService.getAll());
//        model.addAttribute("selectedRole", "ADMIN");
//        return "admin";
//    }
//
//    @PostMapping("/delete")
//    public String deleteUser(@RequestParam Long userId) {
//        userService.delete(userId);
//        return "redirect:/admin";
//    }
//
//    @PostMapping("/update")
//    public String updateUser(@RequestParam Long id, @RequestParam String lastName,
//                             @RequestParam String firstName, @RequestParam int age,
//                             @RequestParam(required = false) String username, @RequestParam(required = false) String password,
//                             @RequestParam List<String> roles) {
//        userService.updateUserDetails(id, firstName, lastName, age, username, password, roles);
//        return "redirect:/admin";
//    }
//
//
//    @PostMapping("/add")
//    public String addUser(@RequestParam String firstName,
//                          @RequestParam String lastName,
//                          @RequestParam int age,
//                          @RequestParam String username,
//                          @RequestParam String password,
//                          @RequestParam List<Long> roleIds ){
//        userService.add(new User(firstName, lastName, age, username, password), roleIds);
//        return "redirect:/admin";
//    }
//}

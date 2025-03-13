package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping
    public ResponseEntity<User> getUser(@AuthenticationPrincipal User user){
        return ResponseEntity.ok(user);
    }
}

//@Controller
//@RequestMapping("/user")
//public class UserController {
//
//    private final UserService userService;
//
//    @Autowired
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping
//    public String userPage(@AuthenticationPrincipal User user, Model model) {
//        model.addAttribute("user", user);
//        model.addAttribute("users", List.of(user));
//        model.addAttribute("selectedRole", "USER");
//        return "user";
//    }
//}


//    @PostMapping("/update")
//    public String updateUser(@RequestParam Long id, @RequestParam String firstName,
//                             @RequestParam String lastName, @RequestParam int age) {
//        userService.updateUserDetails(id, firstName, lastName, age, );
//        return "redirect:/user";
//    }


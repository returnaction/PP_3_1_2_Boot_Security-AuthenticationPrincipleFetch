package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/register")
    public String getRegisterPage(){
        return "register";
    }

    @GetMapping("/login")
    public String getLoginPage(){
        return "login";
    }

    @GetMapping("/user")
    public String getUserPage(){
        return "user";
    }

    @GetMapping("/admin")
    public String getAdminPage(){
        return "admin";
    }
}

package ru.kata.spring.boot_security.demo.controller;

//@RestController
//@RequestMapping("/api/login")
//public class LoginController {
//
//    private final AuthenticationManager authenticationManager;
//
//    @Autowired
//    public LoginController(AuthenticationManager authenticationManager) {
//        this.authenticationManager = authenticationManager;
//    }
//
//    @PostMapping
//    public void login(@RequestBody Map<String, String> credentials) {
//        String username = credentials.get("username");
//        String password = credentials.get("password");
//
//        // Аутентификация пользователя
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(username, password)
//        );
//
//        // Сохраняем аутентификацию в контексте безопасности
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//    }
//}



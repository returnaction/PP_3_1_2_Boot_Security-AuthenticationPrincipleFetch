package ru.kata.spring.boot_security.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootSecurityDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityDemoApplication.class, args);
		// TODO при регистрации нового пользователя форма не очищается
		// TODO когда регистрируюсь проверить что пароли совпадают на фронте
		// TODO сделать Роли покрасивее в ADMIN add new user
		// TODO сделать может что бы использовалась одна и таже форма для регистрации и add user в admin
		// TODO сделать когда зарегестрировался что бы сразу переходила к /login
		// TODO при логине посенять что бы перенаправляло на /user а не сюда http://localhost:8091/api/user
		// TODO

//		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//		String rawPassword = "admin";
//		String encodedPassword = encoder.encode(rawPassword);
//		System.out.println(encodedPassword);
	}


//			1. Написать Rest-контроллеры для вашего приложения.
//			2. Переписать вывод (заполнение) таблицы, модальных окон и т.д. На JS c помощью Fetch API, допускается использование JQuery.
//			3. При любых изменениях данных страница приложения не должна перезагружаться!
}

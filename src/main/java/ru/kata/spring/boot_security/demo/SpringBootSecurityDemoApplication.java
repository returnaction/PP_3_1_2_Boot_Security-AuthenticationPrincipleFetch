package ru.kata.spring.boot_security.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootSecurityDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityDemoApplication.class, args);
		// done при регистрации нового пользователя форма не очищается
		// done TODO когда регистрируюсь проверить что пароли совпадают на фронте
		// done сделать Роли покрасивее в ADMIN add new user
		// done TODO сделать когда зарегестрировался что бы сразу переходила к /login
		// done TODO при логине посенять что бы перенаправляло на /user а не сюда http://localhost:8091/api/user
		// TODO добавить проверку что бы проерял если есть такой логин перед тем как редактировать его
		// done TODO когда нажимаешь на кнопку выйти что бы пользователь стал не аунтефицирован. и переходило на /login

	}


//			1. Написать Rest-контроллеры для вашего приложения.
//			2. Переписать вывод (заполнение) таблицы, модальных окон и т.д. На JS c помощью Fetch API, допускается использование JQuery.
//			3. При любых изменениях данных страница приложения не должна перезагружаться!
}

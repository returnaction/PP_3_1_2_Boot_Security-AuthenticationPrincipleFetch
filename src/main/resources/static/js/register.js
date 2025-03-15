document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Останавливаем стандартную отправку формы

    // Получаем данные из формы
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        passwordConfirm: document.getElementById('passwordConfirm').value
    };

    // Проверяем, что пароли совпадают
    if (formData.password !== formData.passwordConfirm) {
        document.getElementById('message').innerHTML = 'Пароли не совпадают!';
        return;
    }

    // Отправляем данные на сервер
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Ошибка регистрации');
        })
        .then(data => {
            document.getElementById('message').innerHTML = 'Регистрация успешна! Перенаправление...';
            setTimeout(() => {
                window.location.href = '/login';  // Перенаправление через 2 сек.
            }, 1000);
        })
        .catch(error => {
            document.getElementById('message').innerHTML = 'Ошибка: ' + error.message;
        });
});

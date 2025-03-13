document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Предотвращаем стандартную отправку формы

    // Сбор данных формы
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        passwordConfirm: document.getElementById('passwordConfirm').value,
        // Здесь можно добавить роли, если нужно
    };

    // Отправка данных на сервер через Fetch API
    fetch('/api/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Указываем формат данных как JSON
        },
        body: JSON.stringify(formData)  // Преобразуем данные формы в JSON
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Registration failed');
            }
        })
        .then(data => {
            // Показать сообщение об успешной регистрации
            document.getElementById('message').innerHTML = 'User registered successfully!';
        })
        .catch(error => {
            // Показать сообщение об ошибке
            document.getElementById('message').innerHTML = 'Error: ' + error.message;
        });
});


// document.getElementById('registerForm').addEventListener('submit', function(event) {
//     event.preventDefault();  // Предотвращаем стандартную отправку формы
//
//     // Сбор данных формы
//     const formData = {
//         firstName: document.getElementById('firstName').value,
//         lastName: document.getElementById('lastName').value,
//         age: document.getElementById('age').value,
//         username: document.getElementById('username').value,
//         password: document.getElementById('password').value,
//         passwordConfirm: document.getElementById('passwordConfirm').value
//     };
//
//     // Отправка данных на сервер через Fetch API
//     fetch('/api/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'  // Указываем формат данных как JSON
//         },
//         body: JSON.stringify(formData)  // Преобразуем данные формы в JSON
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('Registration failed');
//             }
//         })
//         .then(data => {
//             // Показать сообщение об успешной регистрации
//             document.getElementById('message').innerHTML = 'User registered successfully!';
//         })
//         .catch(error => {
//             // Показать сообщение об ошибке
//             document.getElementById('message').innerHTML = 'Error: ' + error.message;
//         });
// });

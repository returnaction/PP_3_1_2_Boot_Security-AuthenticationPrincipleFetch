document.addEventListener("DOMContentLoaded", function () {
    loadUsers();
    loadAuthenticatedUser();

    document.getElementById("add-user-form").addEventListener("submit", function (event) {
        event.preventDefault();
        addUser();
    });

    // Добавляем обработчик клика по кнопке удаления
    document.getElementById("users-table-body").addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const button = event.target;
            openDeletePopup(
                button.dataset.userId,
                button.dataset.username,
                button.dataset.firstname,
                button.dataset.lastname,
                button.dataset.age,
                button.dataset.roles
            );
        }

        // Добавляем обработчик клика по кнопке редактирования
        if (event.target.classList.contains("edit-btn")) {
            const button = event.target;
            openEditPopup(
                button.dataset.userId,
                button.dataset.username,
                button.dataset.firstname,
                button.dataset.lastname,
                button.dataset.age,
                button.dataset.roles
            );
        }
    });
});

// Функция загрузки пользователей
function loadUsers() {
    fetch("/api/admin/users")
        .then(response => response.json())
        .then(users => {
            const tableBody = document.getElementById("users-table-body");
            if (!tableBody) return;
            tableBody.innerHTML = "";
            console.log(users)
            users.forEach(user => {
                const row = `<tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.lastName}</td>
                    <td>${user.firstName}</td>
                    <td>${user.age}</td>
                    
                    <td>
                        <button class="btn btn-warning edit-btn"
                            data-user-id="${user.id}"
                            data-username="${user.username}"
                            data-firstname="${user.firstName}"
                            data-lastname="${user.lastName}"
                            data-age="${user.age}"
                            data-roles='${JSON.stringify(user.roles)}'>
                            Редактировать
                        </button>
                         <button class="btn btn-danger delete-btn"
                            data-user-id="${user.id}"
                            data-username="${user.username}"
                            data-firstname="${user.firstName}"
                            data-lastname="${user.lastName}"
                            data-age="${user.age}"
                            data-roles='${JSON.stringify(user.roles)}'>
                        Удалить
                        </button>
                    </td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Ошибка загрузки пользователей:", error));
}

// Функция загрузки ролей в sidebar
function loadAuthenticatedUser() {
    fetch("/api/user")
        .then(response => response.json())
        .then(user => {
            console.log("Аутентифицированный пользователь:", user);

            if (!user.roles || user.roles.length === 0) {
                console.error("Роли отсутствуют в ответе сервера:", user);
                return;
            }

            // Обновляем sidebar
            const sidebar = document.getElementById("sidebar-roles");
            if (sidebar) {
                sidebar.innerHTML = "";
                user.roles.forEach(role => {
                    const rolePath = `/${role.name.toLowerCase()}`;
                    const isActive = window.location.pathname === rolePath; // Проверяем текущий URL

                    sidebar.innerHTML += `
                        <li class="nav-item">
                            <a class="nav-link ${isActive ? "active text-white bg-primary" : ""}" href="${rolePath}">
                                ${role.name}
                            </a>
                        </li>`;
                });
            }

            // Обновляем navbar
            const userNameElement = document.getElementById("user-name");
            const userRolesElement = document.getElementById("user-roles");
            if (userNameElement) userNameElement.textContent = user.username;
            if (userRolesElement) userRolesElement.textContent = user.roles.map(r => r.name).join(", ");
        })
        .catch(error => console.error("Ошибка загрузки аутентифицированного пользователя:", error));
}

// function loadAuthenticatedUser() {
//     fetch("/api/user")
//         .then(response => response.json())
//         .then(user => {
//             console.log("Аутентифицированный пользователь:", user);
//
//             if (!user.roles || user.roles.length === 0) {
//                 console.error("Роли отсутствуют в ответе сервера:", user);
//                 return;
//             }
//
//             // Обновляем sidebar
//             const sidebar = document.getElementById("sidebar-roles");
//             if (sidebar) {
//                 sidebar.innerHTML = "";
//                 user.roles.forEach(role => {
//                     sidebar.innerHTML +=
//                         `<li class="nav-item">
//                             <a class="nav-link" href="/${role.name.toLowerCase()}">${role.name}</a>
//                         </li>`;
//                 });
//             }
//
//             // Обновляем navbar
//             const userNameElement = document.getElementById("user-name");
//             const userRolesElement = document.getElementById("user-roles");
//             if (userNameElement) userNameElement.textContent = user.username;
//             if (userRolesElement) userRolesElement.textContent = user.roles.map(r => r.name).join(", ");
//         })
//         .catch(error => console.error("Ошибка загрузки аутентифицированного пользователя:", error));
// }


// Функция добавления нового пользователя
function addUser() {
    // Собираем данные пользователя
    const user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        roles: []
    };

// Пример передачи ролей как объектов с id
    if (document.getElementById("roleUser").checked) {
        user.roles.push({id: 1}); // ID роли USER
    }
    if (document.getElementById("roleAdmin").checked) {
        user.roles.push({id: 2}); // ID роли ADMIN
    }

    console.log("Роли пользователя:", user.roles);

    fetch("/api/admin/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("Ответ от сервера:", response);

            if (response.ok) {
                loadUsers();
                document.getElementById("add-user-form").reset();
            } else {
                console.error("Ошибка при добавлении пользователя, статус:", response.status);
                response.text().then(text => console.error("Текст ошибки:", text));
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
        });

}

// Функция открытия модального окна с данными пользователя
function openDeletePopup(userId, username, firstName, lastName, age, rolesJson) {
    document.getElementById("deleteUserId").value = userId;
    document.getElementById("deleteFirstName").value = firstName;
    document.getElementById("deleteLastName").value = lastName;
    document.getElementById("deleteAge").value = age;
    document.getElementById("deleteUsername").value = username;

    // Разбираем JSON-строку обратно в массив объектов
    let rolesArray;
    try {
        rolesArray = JSON.parse(rolesJson);
    } catch (e) {
        console.error("Ошибка парсинга ролей:", e);
        rolesArray = [];
    }

    // Преобразуем массив объектов в строку (берем name у каждой роли)
    const rolesString = rolesArray.map(role => role.name).join(', ');
    document.getElementById("deleteRoles").value = rolesString;

    // Лог для проверки
    console.log("Roles parsed:", rolesArray);
    console.log("Formatted Roles:", rolesString);

    // Открываем модальное окно
    let deleteModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    deleteModal.show();

    document.getElementById("confirmDeleteBtn").onclick = function () {
        deleteUser(userId);
        deleteModal.hide();
    };
}


// Функция удаления пользователя с использованием fetch
function deleteUser(userId) {
    fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
    })
        .then(response => {
            if (response.ok) {
                loadUsers(); // Обновляем список пользователей после удаления
            } else {
                alert("Ошибка при удалении пользователя.");
            }
        })
        .catch(error => {
            console.error("Ошибка при удалении пользователя:", error);
            alert("Ошибка при удалении пользователя.");
        });
}

// Открытие модального окна для редактирования пользователя
function openEditPopup(userId, username, firstName, lastName, age, rolesJson) {
    console.log("Открытие модального окна для пользователя:", userId, username);

    document.getElementById("editUserId").value = userId;
    document.getElementById("editUsername").value = username;
    document.getElementById("editFirstName").value = firstName;
    document.getElementById("editLastName").value = lastName;
    document.getElementById("editAge").value = age;

    let userRoles = [];

    try {
        userRoles = JSON.parse(rolesJson).map(role => role.name); // Парсим роли пользователя
    } catch (e) {
        console.error("Ошибка парсинга ролей:", e);
    }

    const select = document.getElementById("editRoles");
    if (!select) return;
    select.innerHTML = ""; // Очищаем перед вставкой новых данных

    // Предопределенные роли
    const roles = [
        { id: 1, name: "USER" },
        { id: 2, name: "ADMIN" }
    ];

    roles.forEach(role => {
        const option = document.createElement("option");
        option.value = role.id;
        option.textContent = role.name;

        // Если у пользователя есть эта роль — выбираем её
        if (userRoles.includes(role.name)) {
            option.selected = true;
        }

        select.appendChild(option);
    });

    let editModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    editModal.show();

    document.getElementById("confirmEditBtn").onclick = function () {
        editUser(userId);
        editModal.hide();
    };
}



// Функция для редактирования пользователя
// Функция для редактирования пользователя
function editUser(userId) {
    const user = {
        username: document.getElementById("editUsername").value, // Новый username
        firstName: document.getElementById("editFirstName").value,
        lastName: document.getElementById("editLastName").value,
        age: document.getElementById("editAge").value,
        password: document.getElementById("editPassword").value || undefined, // Новый пароль (необязательный)
        roles: Array.from(document.getElementById("editRoles").selectedOptions).map(option => option.value) // Роли (например, через селект с множественным выбором)
    };

    console.log("Данные для обновления пользователя:", user); // Выводим в консоль

    // Если пароль пустой, не отправляем его
    if (!user.password) {
        delete user.password;
    }


    fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                loadUsers();
            } else {
                console.error("Ошибка при обновлении пользователя:", response);
                response.text().then(text => console.error("Текст ошибки:", text));
            }
        })
        .catch(error => {
            console.error("Ошибка:", error);
        });
}


/*
Что делает этот код
Перехватывает клик по вкладке, у которой data-bs-toggle="tab".
Предотвращает стандартное поведение (event.preventDefault()), чтобы #addUser не добавлялся в URL.
Находит нужную вкладку по href (например, #addUser).
Программно переключает вкладку с помощью Bootstrap (new bootstrap.Tab(tabElement).show()).
 */
document.addEventListener("DOMContentLoaded", function () {
    // Перехватываем клик по вкладке "Добавить пользователя"
    document.querySelectorAll('a[data-bs-toggle="tab"]').forEach(tab => {
        tab.addEventListener("click", function (event) {
            event.preventDefault();
            let tabId = this.getAttribute("href"); // Например, "#addUser"
            let tabElement = document.querySelector(tabId);

            if (tabElement) {
                let tab = new bootstrap.Tab(tabElement);
                tab.show();
            }
        });
    });
});
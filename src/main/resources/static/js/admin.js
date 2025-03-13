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
                    sidebar.innerHTML +=
                        `<li class="nav-item">
                            <a class="nav-link" href="/${role.name.toLowerCase()}">${role.name}</a>
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
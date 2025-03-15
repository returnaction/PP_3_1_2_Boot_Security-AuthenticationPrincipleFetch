document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/user")
        .then(response => response.json())
        .then(user => {
            // Обновление данных о пользователе в таблице
            document.getElementById("user-id").textContent = user.id;
            document.getElementById("user-username").textContent = user.username;
            document.getElementById("user-lastname").textContent = user.lastName;
            document.getElementById("user-firstname").textContent = user.firstName;
            document.getElementById("user-age").textContent = user.age;

            // Обновление ролей
            let rolesText = user.roles.map(role => role.name).join(", ");
            document.getElementById("user-roles").textContent = rolesText;

            // Обновление имени пользователя в header
            const userNameElement = document.getElementById("user-name");
            if (userNameElement) userNameElement.textContent = user.username;

            // Обновление sidebar с ролями
            let sidebar = document.getElementById("sidebar-roles");
            user.roles.forEach(role => {
                sidebar.innerHTML +=
                    `<li class="nav-item">
                        <a class="nav-link" href="/${role.name.toLowerCase()}">${role.name}</a>
                    </li>`;
            });
        })
        .catch(error => console.error("Ошибка загрузки пользователя", error));
});


// document.addEventListener("DOMContentLoaded", () => {
//     fetch("/api/user")
//         .then(response => response.json())
//         .then(user => {
//             document.getElementById("user-id").textContent = user.id;
//             document.getElementById("user-username").textContent = user.username;
//             document.getElementById("user-lastname").textContent = user.lastName;
//             document.getElementById("user-firstname").textContent = user.firstName;
//             document.getElementById("user-age").textContent = user.age;
//
//             let rolesText = user.roles.map(role => role.name).join(", ");
//             document.getElementById("user-roles").textContent = rolesText;
//
//             let sidebar = document.getElementById("sidebar-roles");
//             user.roles.forEach(role => {
//                 sidebar.innerHTML +=
//                     `<li class="nav-item">
//                             <a class="nav-link" href="/${role.name.toLowerCase()}">${role.name}</a>
//                         </li>`;
//             });
//         })
//         .catch(error => console.error("Ошибка загрузки пользователя", error));
// });
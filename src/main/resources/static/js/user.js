document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/user")
        .then(response => response.json())
        .then(user => {
            document.getElementById("user-id").textContent = user.id;
            document.getElementById("user-username").textContent = user.username;
            document.getElementById("user-lastname").textContent = user.lastName;
            document.getElementById("user-firstname").textContent = user.firstName;
            document.getElementById("user-age").textContent = user.age;

            let rolesText = user.roles.map(role => role.name).join(", ");
            document.getElementById("user-roles").textContent = rolesText;

            const userNameElement = document.getElementById("user-name");
            if (userNameElement) userNameElement.textContent = user.username;

            let sidebar = document.getElementById("sidebar-roles");
            let currentPath = window.location.pathname.toLowerCase();

            user.roles.forEach(role => {
                let rolePath = `/${role.name.toLowerCase()}`;
                let isActive = currentPath === rolePath;

                let roleItem = document.createElement("li");
                roleItem.classList.add("nav-item");

                let roleLink = document.createElement("a");
                roleLink.href = rolePath;
                roleLink.classList.add("nav-link");
                if (isActive) roleLink.classList.add("active"); // Добавляем класс active если это текущая страница
                roleLink.textContent = role.name;

                roleItem.appendChild(roleLink);
                sidebar.appendChild(roleItem);
            });
        })
        .catch(error => console.error("Ошибка загрузки пользователя", error));
});



// document.addEventListener("DOMContentLoaded", () => {
//     fetch("/api/user")
//         .then(response => response.json())
//         .then(user => {
//             // Обновление данных о пользователе в таблице
//             document.getElementById("user-id").textContent = user.id;
//             document.getElementById("user-username").textContent = user.username;
//             document.getElementById("user-lastname").textContent = user.lastName;
//             document.getElementById("user-firstname").textContent = user.firstName;
//             document.getElementById("user-age").textContent = user.age;
//
//             // Обновление ролей
//             let rolesText = user.roles.map(role => role.name).join(", ");
//             document.getElementById("user-roles").textContent = rolesText;
//
//             // Обновление имени пользователя в header
//             const userNameElement = document.getElementById("user-name");
//             if (userNameElement) userNameElement.textContent = user.username;
//
//             // Обновление sidebar с ролями
//             let sidebar = document.getElementById("sidebar-roles");
//             user.roles.forEach(role => {
//                 sidebar.innerHTML +=
//                     `<li class="nav-item">
//                         <a class="nav-link" href="/${role.name.toLowerCase()}">${role.name}</a>
//                     </li>`;
//             });
//         })
//         .catch(error => console.error("Ошибка загрузки пользователя", error));
// });


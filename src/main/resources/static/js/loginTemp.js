document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Останавливаем стандартную отправку формы

    const formData = new FormData(this);

    try {
        const response = await fetch("/login", {
            method: "POST",
            body: formData,
            credentials: "same-origin"
        });

        if (response.redirected) {
            window.location.href = response.url; // Перенаправление на защищенную страницу
        } else {
            throw new Error("Ошибка входа");
        }
    } catch (error) {
        document.getElementById("message").innerHTML = `<div class="alert alert-danger">Ошибка входа</div>`;
    }
});

// document.getElementById("loginForm").addEventListener("submit", async function (event) {
//     event.preventDefault(); // Останавливаем стандартную отправку формы
//
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     const messageDiv = document.getElementById("message");
//
//     try {
//         const response = await fetch("/api/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             credentials: "same-origin", // Это гарантирует, что cookies будут передаваться
//             body: JSON.stringify({ username, password })
//         });
//
//         // Редирект будет выполнен самим Spring Security, если все прошло успешно
//         if (!response.ok) {
//             throw new Error("Ошибка аутентификации");
//         }
//     } catch (error) {
//         console.error("Ошибка запроса:", error);
//         messageDiv.innerHTML = `<div class="alert alert-danger">Ошибка входа</div>`;
//     }
// });


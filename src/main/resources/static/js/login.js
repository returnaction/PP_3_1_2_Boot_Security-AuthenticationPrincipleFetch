document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Останавливаем стандартную отправку формы

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById("message");

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin", // Теперь браузер сохранит сессию
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error("Ошибка аутентификации");
        }

        const data = await response.json(); // Парсим JSON-ответ
        window.location.href = data.redirectUrl; // 🔥 Перенаправляем пользователя
    } catch (error) {
        console.error("Ошибка запроса:", error);
        messageDiv.innerHTML = `<div class="alert alert-danger">Ошибка входа</div>`;
    }
});

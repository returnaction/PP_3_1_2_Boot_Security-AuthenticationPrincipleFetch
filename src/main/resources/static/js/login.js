document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    const messageDiv = document.getElementById("message");

    if (response.ok) {
        window.location.href = data.redirectUrl; // Перенаправляем на страницу пользователя
    } else {
        messageDiv.innerHTML = `<div class="alert alert-danger">Ошибка: ${data.message}</div>`;
    }
});

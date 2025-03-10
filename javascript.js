document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const birthdate = document.getElementById('birthdate').value;
    const birthplace = document.getElementById('birthplace').value;
    const zodiac = document.getElementById('zodiac').value;

    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none'; // Скрыть ошибку, если форма валидна

    if (!name || !email || !birthdate || !birthplace || !zodiac) {
        errorMessage.textContent = 'Пожалуйста, заполните все поля!';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/register', {  // Порт должен быть 5000, как у тебя в сервере
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, birthdate, birthplace, zodiac })
        });

        if (response.ok) {
            alert('Спасибо за регистрацию! Ваши данные записаны.');
        } else {
            alert('Ошибка при отправке данных.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось связаться с сервером.');
    }
});

const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Загружаем переменные окружения из .env

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000; // Используем порт, предоставляемый Vercel или локально 5000

// Авторизация с использованием сервисного аккаунта
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json", // Вместо этого можно загрузить JSON ключ через переменные окружения в Vercel
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// ID таблицы Google Sheets
const SPREADSHEET_ID = process.env.SPREADSHEET_ID; // Получаем ID из .env

// Функция для записи данных в Google Sheets
async function writeToSheet(data) {
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });

  await googleSheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Лист1!A:F", // Указываем диапазон для записи
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [data],
    },
  });
}

// API-эндпоинт для регистрации
app.post("/register", async (req, res) => {
  const { name, email, birthdate, birthplace, zodiac } = req.body;

  if (!name || !email || !birthdate || !birthplace || !zodiac) {
    return res.status(400).json({ error: "Заполните все поля!" });
  }

  try {
    await writeToSheet([name, email, birthdate, birthplace, zodiac, new Date().toISOString()]);
    res.status(200).json({ message: "Регистрация успешна!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка записи в таблицу" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

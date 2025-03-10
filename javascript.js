const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');

// Установите API ключ
const API_KEY = 'AIzaSyDfeB09Nb9XbESNAi5nbhsRDG02qyMeTM0';

// Подключаемся к Google Sheets API
const sheets = google.sheets({ version: 'v4', auth: API_KEY });

// Идентификатор таблицы Google Sheets (ID таблицы можно найти в URL)
const spreadsheetId = 'ВАШ_ID_ТАБЛИЦЫ';

async function appendDataToSheet(data) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A1', // Укажи диапазон в котором будут данные
      valueInputOption: 'RAW', // Указываем формат ввода данных
      resource: {
        values: [
          data, // Данные для записи в таблицу
        ],
      },
    });
    console.log('Данные успешно записаны:', response.data);
  } catch (error) {
    console.error('Ошибка при записи в таблицу:', error);
  }
};
